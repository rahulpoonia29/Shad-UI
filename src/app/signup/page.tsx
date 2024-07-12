"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { z } from "zod";
import { signIn } from "next-auth/react";
import axios from "axios";

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

const formSchema = z
	.object({
		name: z.string().min(2, {
			message: "Username must be at least 2 characters.",
		}),
		email: z.string().email({
			message: "Invalid email address.",
		}),
		password: z.string().min(6, {
			message: "Password must be at least 6 characters.",
		}),
		confirmPassword: z.string().min(6, {
			message: "Password must be at least 6 characters.",
		}),
	})
	.superRefine(({ confirmPassword, password }, ctx) => {
		if (confirmPassword !== password) {
			ctx.addIssue({
				code: "custom",
				message: "The passwords did not match",
				path: ["confirmPassword"],
			});
		}
	});

export default function Profile() {
	const [loading, setLoading] = useState(false);
	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
			email: "",
			password: "",
			confirmPassword: "",
		},
	});

	async function onSubmit(values: z.infer<typeof formSchema>) {
		setLoading(true);
		try {
			const response = await axios.post("/api/auth/register", {
				name: values.name,
				email: values.email,
				password: values.password,
			});

			if (response.data.success) {
				toast.success("Account created successfully", {
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

				const signInResponse = await signIn("credentials", {
					email: values.email,
					password: values.password,
					redirect: false,
					callbackUrl: "/dashboard",
				});

				if (signInResponse && !signInResponse.error) {
					router.push("/dashboard");
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
			}
		} catch (error: any) {
			if (axios.isAxiosError(error)) {
				toast.warning(
					error.response?.data?.error || "Account creation failed",
					{
						description: "An error occurred while signing up.",
						position: "top-center",
						richColors: true,
						action: {
							label: "Close",
							onClick: () => {},
							actionButtonStyle: {
								cursor: "pointer",
							},
						},
					}
				);
			} else {
				toast.error("Internal Server Error", {
					description: `An error occurred while signing up.\n${error.message}`,
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
		} finally {
			setLoading(false);
		}
	}

	return (
		<div className="h-screen grid items-center justify-center">
			<Card className="m-4 max-w-lg">
				<CardHeader>
					<CardTitle className="text-2xl">Sign Up</CardTitle>
					<CardDescription>
						Enter your details to create an account.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form
							onSubmit={form.handleSubmit(onSubmit)}
							className="space-y-4"
						>
							<div className="grid grid-cols-2 gap-4">
								<FormField
									control={form.control}
									name="name"
									render={({ field }) => (
										<FormItem>
											<FormLabel>Name</FormLabel>
											<FormControl>
												<Input
													placeholder="John Doe"
													{...field}
												/>
											</FormControl>
											<FormMessage />
										</FormItem>
									)}
								/>
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
							</div>
							<div className="grid grid-cols-2 gap-4">
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
								<FormField
									control={form.control}
									name="confirmPassword"
									render={({ field }) => (
										<FormItem>
											<FormLabel>
												Confirm Password
											</FormLabel>
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
							</div>

							<FormDescription>
								By signing up, you agree to our Terms of Service
								and Privacy Policy.
							</FormDescription>
							<Button
								type="submit"
								className="w-full select-none"
								disabled={loading}
							>
								{loading ? (
									<div className="flex justify-center items-center space-x-1.5">
										<LoaderCircle className="animate-spin w-4 h-4" />
										<span>Signing Up...</span>
									</div>
								) : (
									"Sign Up"
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
						Sign Up with Google
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
						Sign Up with GitHub
					</Button>
				</CardContent>
			</Card>
		</div>
	);
}
