export type AuthError = "OAuthAccountNotLinked" | "Default";

export type NextPageProps<P = object> = P & {
  searchParams?: { [key: string]: string | string[] | undefined };
  params?: { [key: string]: string | string[] | undefined };
};

export type NextPagePromiseProps<P = object> = P & {
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
  params?: Promise<{ [key: string]: string | string[] | undefined }>; 
}