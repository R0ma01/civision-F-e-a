import Link from 'next/link';
import { PagePaths } from '@/components/enums/page-paths-enum';

interface SidebarItemProps {
    pagePath: PagePaths;
    hoverColor: 'green' | 'red' | 'blue' | 'none'; // Explicitly define the possible colors
    children?: React.ReactNode;
    onClick?: (e: any) => void;
    className?: string;
    active?: boolean;
}

const SideBarItem: React.FC<SidebarItemProps> = ({
    pagePath,
    hoverColor,
    onClick,
    children,
    className = '',
    active = true,
}) => {
    // Define hover classes

    const hoverClasses = {
        green: 'hover:bg-green-200',
        red: 'hover:bg-red-200',
        blue: 'hover:bg-blue-200',
        none: 'hover:bg-transparent',
    };

    // Apply the hover class based on the hoverColor prop
    const hoverClass = active
        ? hoverClasses[hoverColor] + ' hover:scale-110 hover:shadow-lg'
        : '';

    const bgColor = active ? '' : 'text-gray-400';

    return (
        <Link
            href={active ? pagePath : '#'}
            className={`flex items-center text-black justify-start w-14 group-hover:w-56 group-hover:translate-x-2 duration-300 transition ${className}`}
            onClick={(e) => {
                if (onClick) {
                    e.preventDefault(); // Prevent the default link behavior if onClick is provided
                    onClick(e);
                }
            }}
        >
            <div
                className={`flex ${bgColor} flex-row h-11 w-full items-center text-black transition-transform duration-300 py-2 px-2 ${hoverClass}`}
            >
                {children}
            </div>
        </Link>
    );
};

export default SideBarItem;
