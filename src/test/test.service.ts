import { Injectable } from '@nestjs/common';
import { CreateTestDto } from './dto/create-test.dto';
import { UpdateTestDto } from './dto/update-test.dto';
import { strict } from 'assert';

@Injectable()
export class TestService {
  private tests = [
    { id: 0, name: 'testA', action: 'run' },
    { id: 1, name: 'testB', action: 'jump' },
  ];

  getTests(action?: 'run' | 'jump') {
    if (action) {
      return this.tests.filter((test) => test.action === action);
    }
    return this.tests;
  }

  getTest(id: number) {
    const test = this.tests.find((test) => test.id === id);

    if (!test) {
      throw new Error('test not found');
    }

    return test;
  }

  createTest(CreateTestDto: CreateTestDto) {
    const newTest = {
      ...CreateTestDto,
      id: Date.now(),
    };
    this.tests.push(newTest);

    return newTest;
  }

  updateTest(id: number, UpdateTestDto: UpdateTestDto) {
    this.tests = this.tests.map((test) => {
      if (test.id === id) {
        return { ...test, ...UpdateTestDto };
      }
      return test;
    });
    return this.getTest(id);
  }

  removeTest(id: number) {
    const toBeRemoved = this.getTest(id);

    this.tests = this.tests.filter((test) => test.id === id);

    return toBeRemoved;
  }
}
