import { Component, ReactNode } from "react";

export default function Pages({ children }: { children: ReactNode }) {
  return <div className={`container mx-auto my-4 px-4`}>{children}</div>;
}
