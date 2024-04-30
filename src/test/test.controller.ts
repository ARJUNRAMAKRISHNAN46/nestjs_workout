import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { TestService } from './test.service';
import { NotFoundError } from 'rxjs';
import { BeltGuard } from 'src/belt/belt.guard';

@Controller('test')
@UseGuards(BeltGuard)
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
  getOneTest(@Param('id', ParseIntPipe) id: number) {
    try {
      return this.testService.getTest(+id);
    } catch (error) {
      throw new NotFoundException();
    }
  }

  // POST /test
  @Post()
  createTest(@Body(new ValidationPipe()) CreateTestDto: CreateTestDto) {
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
