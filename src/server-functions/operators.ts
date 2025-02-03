"use server";

import { OperatorsRepo } from "@/orm";
import { Operator } from "@/orm/entities/operators";
import { DeepPartial } from "typeorm";
import { checkAuth } from "./auth";

export const createAnOperator = async (operatorData: DeepPartial<Operator>) => {
  const authResult = await checkAuth();
  if (!authResult.data) {
    return {
      error: "AuthenticationFailed",
    };
  }
  const { username } = authResult.data;
  const operator = OperatorsRepo.create(operatorData);
  operator.user = username;
  await OperatorsRepo.save(operator);
};

export const getUserOperators = async () => {
  const authResult = await checkAuth();
  if (!authResult.data) {
    return {
      error: "AuthenticationFailed",
    };
  }
  const { username } = authResult.data;
  const operators = await OperatorsRepo.find({ where: { user: username } });
  const sanitizedOperators = operators.map((operator) => ({
    ...operator,
    tools: Array.isArray(operator.tools)
      ? operator.tools
      : operator.tools
      ? JSON.parse(JSON.stringify(operator.tools))
      : [], // Ensure it's an array even if null/undefined
  }));
  return {
    data:sanitizedOperators,

  };
};

export const deleteOperator = async (opetatorId:string)=>{
  const authResult = await checkAuth();
  if (!authResult.data) {
    return {
      error: "AuthenticationFailed",
    };
  }
  const { username } = authResult.data;
  const operator = await OperatorsRepo.findOne({ where: { id: opetatorId } });
  if (!operator) {
    return {
      error: "OperatorNotFound",
    };
  }
  if (operator.user !== username) {
    return {
      error: "Unauthorized",
    };
  }
  await OperatorsRepo.remove(operator);
  return {
    data: "OperatorDeleted",
  };
}
