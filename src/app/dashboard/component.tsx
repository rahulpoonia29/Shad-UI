import React from "react";

type Props = {
    component: {
        name: string;
        description: string;
        content: Record<string, unknown>;
        userId: string;
        teamId?: string;
        createdAt: string;
        updatedAt: string;
    };
};

const ComponentCard = ({ component }: Props) => {
    return (
        <div className="mx-auto max-w-sm overflow-hidden rounded-xl bg-white shadow-md">
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-900">
                    {component.name}
                </h2>
                <p className="text-gray-600">{component.description}</p>
                <div className="mt-2">
                    <h3 className="text-sm font-medium text-gray-700">
                        Content:
                    </h3>
                    <pre className="rounded bg-gray-100 p-2 text-xs text-gray-800">
                        {JSON.stringify(component.content, null, 2)}
                    </pre>
                </div>
                <div className="mt-2">
                    <h3 className="text-sm font-medium text-gray-700">
                        User ID:
                    </h3>
                    <p className="text-gray-600">{component.userId}</p>
                </div>
                {component.teamId && (
                    <div className="mt-2">
                        <h3 className="text-sm font-medium text-gray-700">
                            Team ID:
                        </h3>
                        <p className="text-gray-600">{component.teamId}</p>
                    </div>
                )}
                <div className="mt-2">
                    <h3 className="text-sm font-medium text-gray-700">
                        Created At:
                    </h3>
                    <p className="text-gray-600">
                        {new Date(component.createdAt).toLocaleString()}
                    </p>
                </div>
                <div className="mt-2">
                    <h3 className="text-sm font-medium text-gray-700">
                        Updated At:
                    </h3>
                    <p className="text-gray-600">
                        {new Date(component.updatedAt).toLocaleString()}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ComponentCard;
