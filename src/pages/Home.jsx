import React from 'react'
import { useState } from 'react'
import "./Home.css" 

import { HeroParallax } from '../components/HeroParallax'
import { BentoGrid, BentoGridItem } from "../components/BentoGrid"
// import {
//   IconArrowWaveRightUp,
//   IconBoxAlignRightFilled,
//   IconBoxAlignTopLeft,
//   IconClipboardCopy,
//   IconFileBroken,
//   IconSignature,
//   IconTableColumn,
// } from "@tabler/icons-react";


import Menu from '../components/Menu'
import pic1 from '../images/Screenshot 2025-03-23 143028.png';


function Home() {
    const [text, setText] = useState(0)
    const products = [
      {title: "Rotational Physics", thumbnail: "https://media-hosting.imagekit.io//7d8138a91a404054/Screenshot%202025-03-23%20143028.png?Expires=1837375553&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=iKOT1fqRil8SdTsBvGZQ9H0wZGBLQozZ39qAGCZdLdfQJ1XIkodLvq~Ucrd2j9jM~8Ahd9A5CqdktF5CFmCu083mWLYcb902zlkBCU96IglGkFOjOo6cEDezNO6khg4PLThfuQXwjHi67lRVXNasT07gJCjound9WIzgWyZnSsfEytSH7jtnuiVsLLCzRSkUEaI5JqI-tMOdnj3A~zSyAjAk4DiYKoJZ8N7SSapD~I7YgtpA9uOmdlIN1FhDBaPNdK8fLpOaR8JZabCV7btRzIlJJShj~JFHfUzvSDmBa3LZDts85CPrG2dbZEFMV9EOXbqAn62MeuPj4Wii8Cabhw__", link: "#"},
      {title: "Revolutions", thumbnail: "https://media-hosting.imagekit.io//ca29d5cd564544ec/Screenshot%202025-03-23%20142937.png?Expires=1837375853&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=3Mes98kXNUmyrg2x~IR92G4oIZh6HKgSjVk2mdcJgKZ-s0ZxI-DZsIDkSdxN1sSUagxRjwDm5rycYYiRS0gZ0MnrZIhVeD9yoRT9SC8wZG5KKZMyXGBLV~na~Ri-t-g3dI7t6YRDvhHhH~ZEEGypU5opRb~9LTOiQ2lpSBwvzh2kHMLiecpXPhh0KxDX7m-lRcA8jaOZhn5vokxXfyhAeS2u23ogcwcS9eFZGDyIQP118KrHh4TDQY1i3xiIp1Ovx5HwtAglHm-e6ul9Oas-dCP6aZndhAd-liKr9XjQaRRRbVCpzq0BZ1N3SoqxSE2W1wg5~uls6mszQ-qmIM33xQ__", link: "#"},
      {title: "Land Based Empires Chart", thumbnail: "https://media-hosting.imagekit.io//dd7beaf57f5b459c/Screenshot%202025-03-23%20152500.png?Expires=1837376710&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=kJS54PoJyAi932u8PfdwqQ5TsPg8dI7yVxT2ma1COvryk1qhO3f60d5yO3ZHCL1gDCLSMS5P1T4R~axbZIm3ckzJwGjE0Cct1bQDnyGVD4ToVB5fu6rT5PjTMqkv~cVzmXtYL0JdI3TJ0EsbXGyQA2FdEFOeFwuGcB0keNmwgCkEu~7ze68sRhhMYpfE2vxbWgo1GhhFFn7r0i99SuCauuyhacJr~Wx4Ly2Ch0qf9pmz5OETHeuZuwrtwJZ0hw2aazrSCtr99jmtXeIwPSEHGbYG6nOcWaiIumTaOO~t7pCDB7xpYJYzNFRtGlYbxG5Rg7DqR2bn2jhlS3mDfmjiQQ__", link: "#"},
      {title: "Spanish Conjugations", thumbnail: "https://media-hosting.imagekit.io//ae5e2cf254754b4a/Screenshot%202025-03-23%20143428.png?Expires=1837375862&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=VWUSzeZOR3kl2PJ03mh0OzKUozTHlWLHmDGjqJHCqfCTDOq9Id6AD82wFff-rj5XyE9nBzjulcjFGx0EDRtWUFm~QzJ3OMm~dSp7nxqF9tsLc~x1fF4oJHgeEQkDoa9mQybE2oI-HqTSeiRSeq0NK~7nW9Z9IRofuqRoRNIMlegD0D-1rPj3fLoIxN-YfsKwGGAyNylyGFNChUcfGRaKSkURTrkg~1933AgidgU-fS1E2s66JNwg3Z9q1RnbGbuPQSGY-q3pDbLpgLWWay3K2wSzXt6p5Y9bWKjkessWJVMbpJM1ygb0f0Ofzo4hdIN~l3f0PgWNj4psOoNrzucI8A__", link: "#"},
      {title: "Product5", thumbnail: "https://media-hosting.imagekit.io//4b5c6429fa3345ba/Screenshot%202025-03-23%20143707.png?Expires=1837375869&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=W686PeU-eyHyJei9JnydsqW8sLsQibP9LDr86edZTn7PYEGzNHNCs4xdIz4ldFEZUZQcQasDu8T-tt5BED7bPePALrje8wWVzd7-Cb03B3J-OPYF5iilLE5mnYev5JlCc-mZbfi~y8CAOb-u7AWQHC4tn9EZtP5bd4EnEsnZayTSpYvieQyIuz7KRuwAfohZQ5hM0mfDtoUYNLXhjVkTxH1Ll-zHeoyu~iYY9e0eS~cyz058pCjW9-TcyrjakTG0AD7f0qw0kwlybXGLx~ONQgpBzzLWO-eiuYgum3wMPQm3fU8g-pIS~8n5aKCYV7EdcmJ4GshsI37TBCQ~DvHGaw__", link: "#"},
      {title: "Product6", thumbnail: "https://media-hosting.imagekit.io//4b5c6429fa3345ba/Screenshot%202025-03-23%20143707.png?Expires=1837375869&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=W686PeU-eyHyJei9JnydsqW8sLsQibP9LDr86edZTn7PYEGzNHNCs4xdIz4ldFEZUZQcQasDu8T-tt5BED7bPePALrje8wWVzd7-Cb03B3J-OPYF5iilLE5mnYev5JlCc-mZbfi~y8CAOb-u7AWQHC4tn9EZtP5bd4EnEsnZayTSpYvieQyIuz7KRuwAfohZQ5hM0mfDtoUYNLXhjVkTxH1Ll-zHeoyu~iYY9e0eS~cyz058pCjW9-TcyrjakTG0AD7f0qw0kwlybXGLx~ONQgpBzzLWO-eiuYgum3wMPQm3fU8g-pIS~8n5aKCYV7EdcmJ4GshsI37TBCQ~DvHGaw__", link: "#"},
      {title: "World History", thumbnail: "https://media-hosting.imagekit.io//4b5c6429fa3345ba/Screenshot%202025-03-23%20143707.png?Expires=1837375869&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=W686PeU-eyHyJei9JnydsqW8sLsQibP9LDr86edZTn7PYEGzNHNCs4xdIz4ldFEZUZQcQasDu8T-tt5BED7bPePALrje8wWVzd7-Cb03B3J-OPYF5iilLE5mnYev5JlCc-mZbfi~y8CAOb-u7AWQHC4tn9EZtP5bd4EnEsnZayTSpYvieQyIuz7KRuwAfohZQ5hM0mfDtoUYNLXhjVkTxH1Ll-zHeoyu~iYY9e0eS~cyz058pCjW9-TcyrjakTG0AD7f0qw0kwlybXGLx~ONQgpBzzLWO-eiuYgum3wMPQm3fU8g-pIS~8n5aKCYV7EdcmJ4GshsI37TBCQ~DvHGaw__", link: "#"},
      {title: "Antebellum Period", thumbnail: "https://media-hosting.imagekit.io//b867ce90f29c44e3/Screen Shot 2025-03-23 at 3.32.06 PM.png?Expires=1837377055&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=dX1WlPmg0ALVd~kknO6BWUIQw6kNC2mebpO2GP2Wr2QY6Baa0qeZU~YSLT457g1sqy~6BOfVKpOTgL7dZAvOLhVMqwgSUyYKyrF0PkmStkgiX7Zq9V9J052OBV8eNpYCy9wduK8mpmVASX3MoBtKN4Mf-ftfxNhNTDb04lOOzjLZa1UVGIHwIiVoslXqX5tpdXMUDEtxUtvYmoNHOa5PoQ0~EOd5XwmTPXWHqysdWJa059dX9ZxVLLfu1wADp-LvNYCAtMgkxMJZNjgormaZmEXiJhnb7pG6gEzSwo-BeAlgRFpSr3dw2aXlKMKjWn3EzJgCu7n6mGMfWFM3LGUJ8g__", link: "#"},
      {title: "Colonies", thumbnail: "https://media-hosting.imagekit.io//98f8d0ae40454fed/Screenshot%202025-03-23%20143539.png?Expires=1837377120&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=P86~4vdF1vKYQ7r6JqcHLVV8ICcGdACrXNJ-azS25yAMoe1hODMHbfmffI~SgFYKjV5cYX~TdiLp~t0Wd1u4P2InKYa7aE8SOa0tpfiCYvk72Fb6ZvXwOn78QjtSLCPO47IsJlwSYBJ-kIjL6o~4RGuLV7DzwLWE70hPku6Kl3FZOzfqCymMDUAYq8q3Q4z5JdMpUupD37~kRQTb0LCrWyJwZMWYtnUKwXIAsaiQiFP3WPm5iKwGB232282h~Ml7RIn4HMth8DcwHSIayvx43fSQjgHb3a1YI2RKPFFCxyKLeEAzA6u6ZEU2VQtLN1PAKJ5cWdJM9iNILIIpaIvidw__", link: "#"},
      
     ];
    
    return (
     <>
        <Menu />
        <HeroParallax products={products} />
        <h1 className="homepageHeader">Why Should I Use noteTote?</h1>
        <BentoGrid className="max-w-4xl mx-auto">
            {items.map((item, i) => (
                <BentoGridItem
                key={i}
                image = {item.image}
                title={item.title}
                description={item.description}
                header={item.header}
                className={i === 3 || i === 6 ? "md:col-span-2" : ""}
                />
            ))}
            
            </BentoGrid>
     </>
  )}





  const Skeleton = () => (
    <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl bg-gradient-to-br from-neutral-200 dark:from-neutral-900 dark:to-neutral-800 to-neutral-100"></div>
  );
  const items = [
    {
      title: "The Connection Of A Community",
      description: "Upload your own notes and view other peoples' notes with the touch of a button.",
      header: <Skeleton />,
      image: "https://media-hosting.imagekit.io//deec402e24fa4d78/screenshot_1742772368980.png?Expires=1837380370&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=kKmnzLqfwyYKQYEP1pswx-7JC-K-iL-X57zUSXGdfukwrciI~WcVlR5Pc8SMLmwj3FXPPWsjAzIIi2rICPy7YttpsfF-gVTOtAhVGJzawVBefKswsNtLzIpTJpMnvu4IGbkLU6MXkv4dshl~~Q-1P1MTBR1xvx1A5OUjVUBx7nzzAyG0ECGEdkxCe6aT5wKQqUTaKwwv2EvMTiBjk4Reg4L2LZoUmaTqfhDZrQ0xhTYlvfGHNPz6anAnICmGOA7Br0Eh2A8srfOHmL1o1RsgWyPOWZ7345hCEtUYF1ZmffwQsKbZ~-Z9RZpi2oe~ORW8P-Hav6WjxN71NrK8NfXmUA__",
    },
    {
      title: "Work is Always Synced",
      description: "Our user interface allows you to sign in with google, meaning you can log back to where you finished at any time.",
      header: <Skeleton />,
      image: "",
    },
    {
      title: "Artificial Intelligence Implementation",
      description: "We have integrated an AI API model that helps you organize your notes.",
      header: <Skeleton />,
      image: "",
    },
    
    {
      title: "Cloud Based Storage",
      description: "All of your shared data is stored in our cloud storage, meaning files are secure yet accessible.",
      header: <Skeleton />,
      image: "",
    },
    {
      title: "Authenticity",
      description: "All notes are created and uploaded by students to promote quick and easy studying.",
      header: <Skeleton />,
      image: "",
    },
    
  ];

export default Home