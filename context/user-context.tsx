import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserType } from '@/components/enums/user-type-enum';
import { UserHttpRequestService } from '@/services/user-http-request-service';

interface UserContextType {
    user: UserType;
    setUser: React.Dispatch<React.SetStateAction<UserType>>;
    tutorials: boolean[];
    setLoginTutorials: (tutorials: boolean[]) => void;
    updateCompletedTutorials: (tutorials: boolean[]) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const [user, setUser] = useState<UserType>(UserType.VISITOR);
    const [tutorials, setTutorials] = useState<boolean[]>([]);
    const setLoginTutorials = (tutorial: boolean[]) => {
        setTutorials(tutorial);
    };
    const updateCompletedTutorials = async (tutorial: boolean[]) => {
        setTutorials(tutorial);
        await UserHttpRequestService.updateTutorials(tutorial);
    };

    return (
        <UserContext.Provider
            value={{
                user,
                setUser,
                tutorials,
                setLoginTutorials,
                updateCompletedTutorials,
            }}
        >
            {children}
        </UserContext.Provider>
    );
};

export const useUser = (): UserContextType => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
