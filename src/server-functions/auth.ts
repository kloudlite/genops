"use server";

export const login = async (username:string, password: string)=>{
  return {
    username,
    password
  }
}