"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const DynamicBreadcrumb = () => {
    const pathname = usePathname();
    const pathArray = pathname.split("/").filter((path) => path);

    const buildPath = (index: number) => {
        return "/" + pathArray.slice(0, index + 1).join("/");
    };

    return (
        <Breadcrumb>
            <BreadcrumbList>
                {pathArray.map((segment, index) => (
                    <BreadcrumbItem
                        key={index}
                        className="text-lg font-semibold capitalize"
                    >
                        {index < pathArray.length - 1 ? (
                            <>
                                <BreadcrumbLink asChild>
                                    <Link href={buildPath(index)}>
                                        {segment}
                                    </Link>
                                </BreadcrumbLink>
                                <BreadcrumbSeparator />
                            </>
                        ) : (
                            <BreadcrumbPage>{segment}</BreadcrumbPage>
                        )}
                    </BreadcrumbItem>
                ))}
            </BreadcrumbList>
        </Breadcrumb>
    );
};

export default DynamicBreadcrumb;
