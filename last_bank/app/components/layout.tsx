import React from "react";

export default function Layout ({ children }: { children: React.ReactNode }) {
    return <div className="h-screen w-full gap-1 grid grid-cols-1 md:grid-cols-12 text-white">{ children }</div>;
}
