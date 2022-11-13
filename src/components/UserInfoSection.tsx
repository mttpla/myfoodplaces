import { t } from "i18next";
import React from "react";
import { GoogleLogout } from "react-google-login";
import { useTranslation } from "react-i18next";
import { UserInfoI } from "../utils/Type";

interface UserInfoSectionProps {
  clientId: string;
  userInfo: UserInfoI;
  onLogoutSuccess: CallableFunction;
}

export function UserInfoSection(props: UserInfoSectionProps) {
  const { t } = useTranslation();
  
    return (
      <div>
        <img
          src={props.userInfo.imageUrl}
          alt="user"
          referrerPolicy="no-referrer"
        />
        <p>Name: {props.userInfo.name}</p>
        <p>Email Address: {props.userInfo.email}</p>
        <GoogleLogout
          clientId={props.clientId}
          buttonText={t('t.logoutButton')}
          onLogoutSuccess={() => {
            props.onLogoutSuccess();
          }}
        />
      </div>
    );
  
}


