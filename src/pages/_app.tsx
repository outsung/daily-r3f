import { useRouter } from "next/router";
import useStore from "@/store/store";
import { useEffect } from "react";
import Header from "@/config";
import Dom from "@/components/layout/dom";
import partition from "@/helpers/partition";
import "@/styles/index.css";
import dynamic from "next/dynamic";

import "antd/dist/antd.css"; // or 'antd/dist/antd.less'

const LCanvas = dynamic(() => import("@/components/layout/canvas"), {
  ssr: false,
});

const Balance = ({ child }) => {
  const [r3f, dom] = partition(child, (c) => c.props.r3f === true);

  return (
    <>
      <Dom>{dom}</Dom>
      <LCanvas>{r3f}</LCanvas>
    </>
  );
};

function App({ Component, pageProps = { title: "index" } }) {
  const router = useRouter();

  useEffect(() => {
    useStore.setState({ router });
  }, [router]);

  const child = Component(pageProps).props.children;

  return (
    <>
      <Header title={pageProps.title} />
      <Balance child={child} />
    </>
  );
}

export default App;
