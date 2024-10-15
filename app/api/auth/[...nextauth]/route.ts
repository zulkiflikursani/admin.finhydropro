import NextAuth from "next-auth";

import { options } from "./options";

const handler = NextAuth(options);

export { handler as GET, handler as POST };

// export const authOptions = {
//   providers: [
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID,
//       clientSecret: process.env.GITHUB_SECRET,
//     }),
//   ],
// };
// export default NextAuth(authOptions);
