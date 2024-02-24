import React from "react";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`flex h-screen flex-col bg-background font-mono text-foreground`}
      >
        <div className="flex-grow flex-shrink overflow-hidden p-4 md:px-16 md:py-6 lg:px-32">
            {children}
        </div>
      </body>
    </html>
  );
}