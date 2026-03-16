//Think of middleware like a security guard at a VIP room.
// does authorization for /account routes.
import { auth } from "@/app/_lib/auth";
export const middleware = auth;
// Here name should be config and it only protects accout route
export const config = {
  matcher: ["/account"],
};
