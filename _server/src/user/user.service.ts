import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  // Implement your user service methods here
  async getAllStudentProfile() {
    return this.prisma.profiles.findMany({
      where: {
        Roles: 'STUDENT',
      },
    });
  }

  async getAllTutorProfile() {
    return this.prisma.profiles.findMany({
      where: {
        Roles: 'TUTOR',
      },

      select: {
        id: true,
        full_name: true,
        display_name: true,
        avatar_url: true,
        bio: true,
        hourly_rate: true,
        subjects: true,
      },
    });
  }

  async getTutorFilteredBy(
    searchQuery?: string,
    subject?: string,
    maxPrice?: number,
  ) {
    return this.prisma.profiles.findMany({
      where: {
        Roles: 'TUTOR',

        // filter by search query
        ...(searchQuery && {
          OR: [
            { full_name: { contains: searchQuery, mode: 'insensitive' } },
            { display_name: { contains: searchQuery, mode: 'insensitive' } },
          ],
        }),

        // filter by subject
        ...(subject && {
          subjects: { has: subject },
        }),

        // filter by maximum prices
        ...(maxPrice && {
          hourly_rate: { lte: maxPrice },
        }),
      },

      select: {
        id: true,
        full_name: true,
        display_name: true,
        avatar_url: true,
        bio: true,
        hourly_rate: true,
        subjects: true,
      },
      orderBy: { created_at: 'desc' },
    });
  }

  // async getTutorDetail
}
