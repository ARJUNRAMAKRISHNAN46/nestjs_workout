import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { TestService } from './test.service';

@Controller('test')
export class TestController {
  constructor(private readonly testService: TestService) {}
  // GET /tests --> []
  @Get()
  getTest(@Query('action') action: 'run' | 'jump') {
    const service = new TestService();
    return service.getTests(action);
  }

  // GET /test/:id --> {}
  @Get(':id')
  getOneTest(@Param('id') id: string) {
    return this.testService.getTest(+id);
  }

  // POST /test
  @Post()
  createTest(@Body() CreateTestDto: CreateTestDto) {
    return this.testService.createTest(CreateTestDto);
  }
  // PUT /test/:id
  @Put(':id')
  updateTest(@Param('id') id: string, @Body() UpdateTestDto: UpdateTestDto) {
    return this.testService.updateTest(+id, UpdateTestDto);
  }
  // DELETE /test/:id
  @Delete(':id')
  removeTest(@Param('id') id: string) {
    return this.testService.removeTest(+id);
  }
}
