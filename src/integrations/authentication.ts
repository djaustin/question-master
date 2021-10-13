import { GetServerSidePropsContext, GetServerSidePropsResult } from "next";
import absolute from "next-absolute-url";
import { Session } from "next-auth";
import { getSession } from "next-auth/client";

export const requireLogin = (
  gssp?: (
    context: GetServerSidePropsContext,
    session: Session
  ) => GetServerSidePropsResult<any> | Promise<GetServerSidePropsResult<any>>
) => {
  return async (ctx: GetServerSidePropsContext) => {
    const session = await getSession(ctx);
    if (!session) {
      const { req, resolvedUrl } = ctx;
      const origin = process.env.BASE_URL || absolute(req).origin;
      const callbackUrl = `${origin}${resolvedUrl}`;

      return {
        redirect: {
          destination: `/auth/signin?callbackUrl=${callbackUrl}`,
          permanent: false,
        },
      };
    }

    return gssp ? gssp(ctx, session) : { props: {} };
  };
};
