import { createCookieSessionStorage, redirect } from "solid-start";

const sessionSecret = import.meta.env.VITE_SESSION_SECRET;

const storage = createCookieSessionStorage({
    cookie: {
        name: "t_session",
        secure: true,
        secrets: [sessionSecret],
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24, // 1 day
        httpOnly: true,
    },
});

export function getUserSession(request: Request) {
    return storage.getSession(request.headers.get("Cookie"));
}

export async function getAdmin(request: Request) {
    const session = await getUserSession(request);
    const userId = session.get("userId");
    console.log({ userId });

    if (!userId || typeof userId !== "string") {
        console.log("return null");
        return null;
    }

    console.log("return id");
    return userId;
}


export async function createUserSession(userId: string, redirectTo: string) {
    const session = await storage.getSession();
    session.set("userId", userId);
    return redirect(redirectTo, {
        headers: {
            "Set-Cookie": await storage.commitSession(session)
        }
    });
}