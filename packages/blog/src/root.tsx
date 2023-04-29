// @refresh reload
import { Suspense } from "solid-js";
import {
    Body,
    ErrorBoundary,
    FileRoutes,
    Head,
    Html,
    Meta,
    Routes,
    Scripts,
    Title,
} from "solid-start";
import "./root.css";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import MainContent from "./components/MainContent/MainContent";

export default function Root() {
    return (
        <Html lang="en">
            <Head>
                <Title>Tykhonravova Blog</Title>
                <Meta charset="utf-8" />
                <Meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
            </Head>
            <Body class="bg-gray-100 flex flex-col min-h-screen">
                <Suspense>
                    <ErrorBoundary>
                        <Header />
                        <MainContent>
                            <Routes>
                                <FileRoutes />
                            </Routes>
                        </MainContent>

                        <Footer />
                    </ErrorBoundary>
                </Suspense>
                <Scripts />
            </Body>
        </Html>
    );
}
