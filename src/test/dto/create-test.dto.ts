import { IsEnum, MinLength } from "class-validator";

export class CreateTestDto {
    @MinLength(3)
    name: string;
    @IsEnum(['run', 'walk'], { message: 'Use correct action!' })
    action: 'run' | 'jump'
}
