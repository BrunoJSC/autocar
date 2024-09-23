import { useEffect, useState } from "react";

function SafeHydrate({ children }: { children: React.ReactNode }) {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div suppressHydrationWarning>{children}</div>;
}
