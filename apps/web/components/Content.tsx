import { useEffect } from 'react';

const Content = (): JSX.Element => {

  const init = () => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    function grain(size: number, name: string, color: string) {
      canvas.width = size;
      canvas.height = size;

      ctx!.fillStyle = color;

      for (let x = 0; x < size; x++) {
        for (let y = 0; y < size; y++) {
          if (Math.random() > 0.5) {
            ctx!.fillRect(x, y, 1, 1);
          }
        }
      }

      canvas.toBlob((blob: any) => {
        const url = URL.createObjectURL(blob);

        document.documentElement.style.setProperty(name, `url(${url})`);
      });
    }

    grain(256, "--grain-square-black", "hsla(0, 100%, 0%, 1)");
    grain(256, "--grain-square-black-opacity", "hsla(0, 100%, 0%, 0.2)");
    grain(256, "--grain-square-white", "hsla(0, 100%, 100%, 1)");
    grain(256, "--grain-square-white-opacity-blend", "hsla(25, 100%, 96%, 0.1375)");
  }

  useEffect(() => {
    init()
  }, [])

return (
  <div className="[ wrapper ]">
    <div className="mt-16 grid place-items-center">
      <h1 className='text-5xl font-bold mb-16 '>Creator Network 赋能 Web3 创作者的未来</h1>
      <a className="[ btn ] mb-16 " href="#building-blocks">
        Building Your Hubs
        <svg className="flex-shrink-0 w-1rem" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 5v14M19 12l-7 7-7-7" />
        </svg>
      </a>
    </div>
    <section className="[ cards ]" id="building-blocks">
      <div className="[ card ] [ blur-bg ]" data-lightsource-distance="l">
        <h2>Assets</h2>
        <p>Gradients and shadows simulate a single light source shining across the page — touching every element.</p>
        <svg className="[ light-illustration ]" viewBox="0 0 256 256" fill="var(--color-orange-medium)">
          <radialGradient id="radialGradient">
            <stop offset="0%" stopColor="white" stopOpacity="1" />
            <stop offset="100%" stopColor="black" stopOpacity="1" />
          </radialGradient>
          <g stroke="#fff" strokeWidth="0.5">
            <circle cx="128" cy="128" r="50%" opacity="0.025"></circle>
            <circle cx="128" cy="128" r="40%" opacity="0.05"></circle>
            <circle cx="128" cy="128" r="30%" opacity="0.075"></circle>
            <circle cx="128" cy="128" r="20%" opacity="0.1"></circle>
            <circle cx="128" cy="128" r="10%" opacity="0.125"></circle>
          </g>
        </svg>
      </div>
      <div className="[ card ] [ blur-bg ]" data-lightsource-distance="m">
        <h2>Application</h2>
        <svg className="[ containers-illustration ]" strokeWidth="2" strokeDasharray="4" stroke="var(--color-orange-medium)">
          <line x1="0" y1="0" x2="50%" y2="50%"></line>
          <line x1="100%" y1="0" x2="50%" y2="50%"></line>
          <line x1="0" y1="100%" x2="50%" y2="50%"></line>
          <line x1="100%" y1="100%" x2="50%" y2="50%"></line>
        </svg>
      </div>
      <div className="[ card ] [ blur-bg ]" data-lightsource-distance="xl">
        <svg className="[ color-illustration ]" viewBox="0 0 256 256">
          <linearGradient id="colorGradient" gradientTransform="rotate(-45)">
            <stop offset="0%" stopColor="var(--color-orange-medium)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--color-orange-medium)" stopOpacity="0" />
          </linearGradient>
          <circle cx="128" cy="128" r="128" fill="url(#colorGradient)"></circle>
        </svg>
        <h2>Assets Hubs</h2>
        <p>A base hue blends into everything — unifying text, shadows, and illustrations.</p>
      </div>
      <div className="[ card ] [ blur-bg ]" data-lightsource-distance="s">
        <h2>Asset Hub Managemer</h2>
        <p>A subtle generative grain adds a touch of the physcial world and smoothes out gradients.</p>
      </div>
    </section>
    <section className='mt-16'>
      <div className="[ card ] [ blur-bg ] flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
        <h2 className='mb-8'>Protocl Design</h2>
        <div className='p-8'>
          <img src="design-2024-04-11.jpg" alt="design" className="w-full h-full mx-auto"/>
        </div>
      </div>
    </section>
  </div>
)
}

export default Content