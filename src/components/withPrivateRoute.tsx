import { Spinner } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { useUser } from "~/providers/AuthContextProvider/AuthContextProvider";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const WithPrivateRoute = (Component: React.FunctionComponent<any>) => {
    const NewComponent = () => {
        const { user, isLoading } = useUser();

        if (isLoading) return <Spinner />;
        if (!!user) return <Component />;

        redirect("/login");
    };

    return NewComponent;
};
