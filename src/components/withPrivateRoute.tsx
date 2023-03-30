import { Spinner } from "@chakra-ui/react";
import { redirect } from "next/navigation";
import { useUser } from "~/providers/AuthContextProvider/AuthContextProvider";
import { api } from "~/utils/api";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const WithPrivateRoute = (Component: React.FunctionComponent<any>) => {
    const NewComponent = () => {
        const { user, isLoading } = useUser();

        if (isLoading) return <Spinner />;
        if (!!user) return <Component />;

        // TODO:
        // jesli uzytkownik w bazie danych istnieje i utworzyl profil i jest zalogowany
        // to daj strone z postami
        // jak nie istnieje albo nie utworzyl profilu
        // to daj set up profile

        redirect("/login");
    };

    return NewComponent;
};
