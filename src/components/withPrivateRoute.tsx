import { Spinner } from "@chakra-ui/react";
import { redirect, usePathname } from "next/navigation";
import { env } from "~/env.mjs";
import { useUser } from "~/providers/AuthContextProvider/AuthContextProvider";
import { api } from "~/utils/api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const WithPrivateRoute = (Component: React.FunctionComponent<any>) => {
    const NewComponent = () => {
        const pathName = usePathname();
        const { user, isLoading } = useUser();
        const { data, isLoading: isProfileLoading } =
            api.user.getProfile.useQuery();

        if (isLoading || isProfileLoading) return <Spinner />;
        if (!user) redirect("/login");

        if (!data?.username && pathName !== "/login/set-profile")
            redirect("/login/set-profile");

        return <Component />;
    };

    return NewComponent;
};
