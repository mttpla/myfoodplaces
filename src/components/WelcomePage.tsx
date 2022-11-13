import React from "react";
import { GoogleLogin } from "react-google-login";
import { useTranslation } from "react-i18next";

interface WelcomePageProps {
  clientId: string;
  onLoginSuccess: CallableFunction;
}

export function WelcomePage(props: WelcomePageProps) {
  const { t } = useTranslation();

  return (
    <>
      <h1>{t("t.welcome")}</h1>
      <GoogleLogin
        clientId={props.clientId}
        buttonText={t("t.LogInButton")}
        onSuccess={(res: any) => {
          props.onLoginSuccess(res.profileObj);
        }}
        onFailure={(err: any) => {
          console.log("failed:", err);
        }}
        cookiePolicy={"single_host_origin"}
        isSignedIn={true}
      />
    </>
  );
}
