"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { signIn, useSession } from "next-auth/react";

import { Button } from "@/components/ui/button";
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const formSchema = z.object({
	email: z.string().email({
		message: "Invalid email address.",
	}),
	password: z.string().min(6, {
		message: "Password must be at least 6 characters.",
	}),
});

export default function Profile() {
	const router = useRouter();

	// Check if the user is already signed in
	const session = useSession();

	if (session.status === "loading") {
		return (
			<div className="min-h-[calc(100vh-64px)] my-10 sm:my-0 grid items-center justify-center">
				<LoaderCircle className="animate-spin duration-75" />
			</div>
		);
	}

	if (session.status === "authenticated") {
		router.push("/dashboard");
		toast.warning("You are already signed in", {
			description:
				"You are already signed in. Redirecting to dashboard...",
			position: "top-center",
			richColors: true,
			action: {
				label: "Close",
				onClick: () => {},
				actionButtonStyle: {
					cursor: "pointer",
				},
			},
		});
		return null;
	}

	const [loading, setLoading] = useState(false);

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);
		try {
			const signInResponse = await signIn("credentials", {
				email: values.email,
				password: values.password,
				redirect: false,
				callbackUrl: "/dashboard",
			});

			if (signInResponse && !signInResponse.error) {
				router.push("/dashboard");
				router.refresh();
				toast.success("Log in successful", {
					description: "You can now use your account.",
					position: "top-center",
					richColors: true,
					action: {
						label: "Close",
						onClick: () => {},
						actionButtonStyle: {
							cursor: "pointer",
						},
					},
				});
			} else {
				toast.error("Sign-in failed", {
					description: signInResponse?.error || "Unknown error",
					position: "top-center",
					richColors: true,
					action: {
						label: "Close",
						onClick: () => {},
						actionButtonStyle: {
							cursor: "pointer",
						},
					},
				});
			}
		} catch (error: any) {
			toast.error("Internal Server Error", {
				description: `An error occurred while signing in.\n${error.message}`,
				position: "top-center",
				richColors: true,
				action: {
					label: "Close",
					onClick: () => {},
					actionButtonStyle: {
						cursor: "pointer",
					},
				},
			});
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="min-h-[calc(100vh-64px)] my-10 sm:my-0 grid items-center justify-center">
			<Card className="m-4 max-w-lg">
				<CardHeader>
					<CardTitle className="text-2xl">Sign In</CardTitle>
					<CardDescription>
						Enter your details to log in.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-4"
						>
							<FormField
								control={form.control}
								name="email"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Email</FormLabel>
										<FormControl>
											<Input
												type="email"
												placeholder="johndoe@gmail.com"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							<FormField
								control={form.control}
								name="password"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Password</FormLabel>
										<FormControl>
											<Input
												type="password"
												placeholder="password"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<Button
								type="submit"
								className="w-full select-none"
								disabled={loading}
							>
								{loading ? (
									<div className="flex justify-center items-center space-x-1.5">
										<LoaderCircle className="animate-spin w-4 h-4" />
										<span>Please wait...</span>
									</div>
								) : (
									"Log In"
								)}
							</Button>
						</form>
					</Form>
					<div className="flex items-center my-2">
						<div className="flex-grow h-px bg-gray-300"></div>
						<span className="flex-shrink font-semibold text-md text-gray-500 mx-4">
							or
						</span>
						<div className="flex-grow h-px bg-gray-300"></div>
					</div>
					<Button
						variant="outline"
						className="w-full mb-3"
						onClick={() =>
							signIn("google", {
								redirect: true,
								callbackUrl: "/dashboard",
							})
						}
					>
						Log In with Google
					</Button>
					<Button
						variant="outline"
						className="w-full"
						onClick={() =>
							signIn("github", {
								redirect: true,
								callbackUrl: "/dashboard",
							})
						}
					>
						Log In with GitHub
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
