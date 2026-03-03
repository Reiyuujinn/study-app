import { Controller, Get, Query } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('tutors/all')
  async getAllProfile() {
    return this.userService.getAllTutorProfile();
  }

  //  GET /user/tutors?search=math&maxPrice=150000
  @Get('tutors')
  async getTutorList(
    @Query('search') search?: string,
    @Query('subject') subject?: string,
    @Query('maxPrice') maxPrice?: string,
  ) {
    const parsedPrice = maxPrice ? parseFloat(maxPrice) : undefined;

    return this.userService.getTutorFilteredBy(search, subject, parsedPrice);
  }

  @Get()
  async getDummyData() {
    return {
      message: 'This is a dummy response from the UserController.',
      timestamp: new Date(),
    };
  }
}
