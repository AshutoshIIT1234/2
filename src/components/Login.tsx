import { LoginPanel } from '@bedrock_org/passport';
import '@bedrock_org/passport/dist/style.css';

export function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <LoginPanel
        title="Sign in to Virtual Companion"
        logo="https://irp.cdn-website.com/e81c109a/dms3rep/multi/orange-web3-logo-v2a-20241018.svg"
        logoAlt="Orange Web3"
        walletButtonText="Connect Wallet"
        showConnectWallet={false}
        separatorText="OR"
        features={{
          enableWalletConnect: false,
          enableAppleLogin: true,
          enableGoogleLogin: true,
          enableEmailLogin: false,
        }}
        titleClass="text-xl font-bold"
        logoClass="ml-2 md:h-8 h-6"
        panelClass="container p-2 md:p-8 rounded-2xl max-w-[480px] bg-white shadow-lg"
        buttonClass="hover:border-orange-500"
        separatorTextClass="bg-white text-gray-500"
        separatorClass="bg-gray-200"
        linkRowClass="justify-center"
        headerClass="justify-center"
      />
    </div>
  );
}