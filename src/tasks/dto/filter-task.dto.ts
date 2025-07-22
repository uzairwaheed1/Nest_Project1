import { TaskStatus } from "../task.model";
import { IsOptional, IsEnum, IsString } from "class-validator";

export class FilterTaskDto {
    // @IsOptional()
    @IsEnum(TaskStatus)
    status?: TaskStatus;

    // @IsOptional()
    @IsString()
    search?: string;
}
    