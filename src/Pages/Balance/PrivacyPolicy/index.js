import React, { Fragment } from "react";
import { Helmet } from "react-helmet";
import AccessibilityLabel from "../../../Components/AccessibilityLabel";
import GenericContainer from "../../../Components/GenericContainer";
import GlobalHeader from "../../../Components/GlobalHeader";
import "./index.scss";

export const BalancePrivacyPolicy = () => {

  return (
    <Fragment>
      <Helmet>
        <title>Privacy Policy — Balance</title>
      </Helmet>

      <GlobalHeader sticky backgroundColor="#fafafa" />

      <GenericContainer className="balance-privacy-policy">
        
        <a href="/balance">
          <img className="app-icon" alt="App Icon" src="/balance/app-icon.png" />
          <AccessibilityLabel>Balance</AccessibilityLabel>
        </a>
        
        <h1>Balance Privacy Policy</h1>
        <p>Balance's Privacy Policy describes how Balance collects, uses, and shares your personal data.</p>
        <p>Please take a moment to familiarize yourself with Balance's privacy practices, and feel free to <a href="mailto:hi@lau.work">contact me</a> if you have any questions.</p>
        <h2>Data Collected by Balance</h2>
        <p>By prioritizing on-device storage and minimizing network requests, Balance manages to deliver great user experiences with no privacy compromises.</p>
        <p>Some information may be collected for analytical purposes, such as the type of card your checking (Bip, TNE, MerVal, among others), or the time of your request. Your card number, which is the most sensitive piece of information we handle, is never stored on our servers.</p>
        <h2>Data Collected by Third-Parties</h2>
        <p>Balance does not share your data with third parties, yet in order to show your transit card balances, your local transit information, and more, we do rely on public, third-party sources from local entities such as Metro de Santiago, Empresa de Ferrocarriles del Estado, among others.</p>
        <p>Balance does not have any formal relation with any of the providers it relies on, and always shares the minimum amount of information required to deliver on specific features. Please read your local transit authority's Privacy Policy for more details on what they might do with your data.</p>
        <h2>About Balance</h2>
        <p>Balance is an independent project created by Laura Sandoval. Balance was not commissioned by, and it's not directly related to any of Chile's official transit authorities.</p>
        <p>If you have any further questions, feel free to contact me via <a href="https://twitter.com/laurasideral">Twitter</a>, <a href="https://instagram.com/laurasideral">Instagram</a>, or at <a href="mailto:hi@lau.work">hi@lau.work</a>.</p>
      </GenericContainer>

    </Fragment>
  );
}

export default BalancePrivacyPolicy;
