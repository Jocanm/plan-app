import { authRepository } from "../../data/auth.repository";
import { User } from "../../domain/types";
import { getCurrentUserUseCase } from "../use-cases/authUseCases";

export const getCurrentUser = async (): Promise<User> => {
  return await getCurrentUserUseCase(authRepository);
};
