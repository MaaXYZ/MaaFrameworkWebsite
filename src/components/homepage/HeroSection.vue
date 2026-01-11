<template>
  <section class="hero-section" :class="{ 'light-mode': isLightMode }">
    <div class="hero-content">
      <div class="hero-left">
        <h1 class="hero-title">
          <span class="title-gradient">{{ content.title }}</span>
        </h1>
        <p class="hero-subtitle">{{ content.subtitle }}</p>
        <p class="hero-description">{{ content.description }}</p>

        <div class="hero-buttons">
          <a
            :href="
              lang === 'zh'
                ? '/docs/1.1-QuickStarted'
                : '/en/docs/1.1-QuickStarted'
            "
            class="btn btn-primary"
          >
            {{ content.buttons.primary }}
          </a>
          <a
            href="https://github.com/MaaXYZ/MaaFramework"
            target="_blank"
            rel="noopener noreferrer"
            class="btn btn-secondary"
          >
            {{ content.buttons.secondary }}
          </a>
        </div>
      </div>

      <div class="hero-right">
        <div class="hero-visual">
          <!-- 编程语言 Logo 粒子系统 -->
          <div class="language-particles">
            <!-- Python -->
            <div class="lang-particle particle-1">
              <svg viewBox="0 0 256 255" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <linearGradient
                    id="pyYellow"
                    x1="12.959%"
                    y1="12.039%"
                    x2="79.639%"
                    y2="78.201%"
                  >
                    <stop offset="0%" stop-color="#387EB8" />
                    <stop offset="100%" stop-color="#366994" />
                  </linearGradient>
                  <linearGradient
                    id="pyBlue"
                    x1="19.128%"
                    y1="20.579%"
                    x2="90.742%"
                    y2="88.429%"
                  >
                    <stop offset="0%" stop-color="#FFE052" />
                    <stop offset="100%" stop-color="#FFC331" />
                  </linearGradient>
                </defs>
                <path
                  d="M126.916.072c-64.832 0-60.784 28.115-60.784 28.115l.072 29.128h61.868v8.745H41.631S.145 61.355.145 126.77c0 65.417 36.21 63.097 36.21 63.097h21.61v-30.356s-1.165-36.21 35.632-36.21h61.362s34.475.557 34.475-33.319V33.97S194.67.072 126.916.072zM92.802 19.66a11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13 11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.13z"
                  fill="url(#pyYellow)"
                />
                <path
                  d="M128.757 254.126c64.832 0 60.784-28.115 60.784-28.115l-.072-29.127H127.6v-8.745h86.441s41.486 4.705 41.486-60.712c0-65.416-36.21-63.096-36.21-63.096h-21.61v30.355s1.165 36.21-35.632 36.21h-61.362s-34.475-.557-34.475 33.32v56.013s-5.235 33.897 62.518 33.897zm34.114-19.586a11.12 11.12 0 0 1-11.13-11.13 11.12 11.12 0 0 1 11.13-11.131 11.12 11.12 0 0 1 11.13 11.13 11.12 11.12 0 0 1-11.13 11.13z"
                  fill="url(#pyBlue)"
                />
              </svg>
            </div>
            <!-- C++ -->
            <div class="lang-particle particle-2">
              <svg
                t="1764519745960"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="18212"
                width="200"
                height="200"
              >
                <path
                  d="M930.87744 763.94496c6.90176-12.1856 11.20256-25.88672 11.20256-38.21568V298.27072c0-12.32896-4.3008-26.03008-11.20256-38.21568L501.76 512l429.11744 251.94496z"
                  fill="#00599C"
                  p-id="18213"
                ></path>
                <path
                  d="M539.48416 1014.76352l360.2432-213.72928c10.36288-6.16448 19.78368-16.7936 26.624-28.9792L501.76 520.13056 77.16864 772.07552c6.84032 12.16512 16.26112 22.79424 26.624 28.95872l360.2432 213.72928c20.74624 12.30848 54.70208 12.30848 75.44832 0z"
                  fill="#004482"
                  p-id="18214"
                ></path>
                <path
                  d="M926.35136 260.05504c-6.88128-12.55424-16.36352-23.552-26.78784-29.9008L537.3952 9.54368c-20.84864-12.71808-54.9888-12.71808-75.85792 0L99.36896 230.15424C78.49984 242.8928 61.44 274.06336 61.44 299.49952V740.7616c0 12.6976 4.25984 26.86976 11.14112 39.424l426.88512-260.05504 426.88512-260.07552z"
                  fill="#659AD2"
                  p-id="18215"
                ></path>
                <path
                  d="M506.368 812.70784C339.06688 812.70784 202.9568 677.80608 202.9568 512s136.0896-300.70784 303.39072-300.70784c107.9296 0 208.60928 57.58976 262.71744 150.26176l-131.2768 75.30496a152.576 152.576 0 0 0-131.44064-75.20256c-83.6608 0-151.69536 67.44064-151.69536 150.34368s68.03456 150.34368 151.69536 150.34368a152.576 152.576 0 0 0 131.44064-75.22304l131.2768 75.30496c-54.10816 92.69248-154.76736 150.28224-262.71744 150.28224z"
                  fill="#FFFFFF"
                  p-id="18216"
                ></path>
                <path
                  d="M800.5632 487.6288h-36.70016v-32.52224h-36.70016v32.50176h-36.70016v32.52224h36.70016v32.50176h36.70016v-32.50176h36.67968zM926.35136 487.6288H889.6512v-32.52224H852.992v32.50176h-36.70016v32.52224h36.70016v32.50176h36.67968v-32.50176h36.70016z"
                  fill="#FFFFFF"
                  p-id="18217"
                ></path>
              </svg>
            </div>
            <!-- C# -->
            <div class="lang-particle particle-3">
              <svg
                t="1764519790330"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="23983"
                width="200"
                height="200"
              >
                <path
                  d="M559.104 17.088L908.8 217.536c31.616 18.112 51.136 51.84 51.136 88.32v409.6a101.76 101.76 0 0 1-50.688 88.064l-349.76 202.816a101.76 101.76 0 0 1-102.72-0.384l-342.784-202.304A101.76 101.76 0 0 1 64 715.968V305.28c0-36.16 19.2-69.632 50.496-87.872L457.28 17.472a101.76 101.76 0 0 1 101.76-0.384z"
                  fill="#A375E6"
                  p-id="23984"
                ></path>
                <path
                  d="M948.48 765.696a90.24 90.24 0 0 1-33.728 34.624L552.192 1010.56c-27.328 15.872-60.8 15.744-88.064-0.32l-355.456-209.792a90.56 90.56 0 0 1-36.608-41.216l427.456-245.568 448.96 252.032z"
                  fill="#7F31F2"
                  p-id="23985"
                ></path>
                <path
                  d="M900.928 246.4c7.36 13.44 59.072 38.144 59.072 54.144v420.16c0 16-4.096 31.488-11.52 44.992-30.08 21.44-179.712-62.592-448.96-252.032l401.408-267.328z"
                  fill="#6247BC"
                  p-id="23986"
                ></path>
                <path
                  d="M778.56 334.848a320 320 0 1 0-8.384 366.272L633.92 615.68a160 160 0 1 1 6.912-198.464l137.728-82.304z"
                  fill="#FFFFFF"
                  p-id="23987"
                ></path>
                <path
                  d="M733.824 536.704l5.504-49.28h-27.008l2.816-39.36h28.608l3.712-33.664h23.296l-3.776 33.664h26.88l3.712-33.664h23.296l-3.776 33.664H832l-2.752 39.424h-16.64l-5.504 49.28h16.576l-2.816 39.36h-18.176l-4.096 36.096h-23.104l4.032-36.096h-26.88l-4.096 36.096h-23.168l4.032-36.096H704l2.752-39.424h27.072z m23.168 0h26.88l5.568-49.28h-26.88l-5.568 49.28z"
                  fill="#FFFFFF"
                  p-id="23988"
                ></path>
              </svg>
            </div>
            <!-- Java -->
            <div class="lang-particle particle-4">
              <svg
                t="1764522603974"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="13759"
                width="200"
                height="200"
              >
                <path
                  d="M558.08 472.064c48.128 53.248-13.312 103.424-13.312 103.424s119.808-61.44 65.536-139.264c-51.2-71.68-91.136-107.52 122.88-232.448 0 1.024-335.872 86.016-175.104 268.288"
                  fill="#FF0000"
                  p-id="13760"
                ></path>
                <path
                  d="M610.304 5.12s101.376 101.376-96.256 258.048C356.352 389.12 478.208 460.8 514.048 543.744 420.864 459.776 354.304 386.048 399.36 317.44 463.872 216.064 651.264 166.912 610.304 5.12"
                  fill="#FF0000"
                  p-id="13761"
                ></path>
                <path
                  d="M720.896 757.76c183.296-95.232 98.304-188.416 39.936-175.104-15.36 3.072-21.504 5.12-21.504 5.12s5.12-8.192 16.384-11.264c117.76-40.96 207.872 120.832-37.888 186.368-1.024 0 2.048-3.072 3.072-5.12m-337.92 38.912s-37.888 21.504 26.624 29.696c76.8 8.192 117.76 8.192 202.752-8.192 0 0 23.552 15.36 53.248 26.624-191.488 80.896-433.152-5.12-282.624-48.128m-23.552-106.496s-43.008 31.744 23.552 37.888c82.944 8.192 149.504 10.24 261.12-13.312 0 0 16.384 16.384 40.96 24.576-231.424 68.608-490.496 5.12-325.632-49.152"
                  fill="#396397"
                  p-id="13762"
                ></path>
                <path
                  d="M811.008 876.544s27.648 23.552-31.744 40.96c-111.616 34.816-460.8 45.056-558.08 2.048-34.816-15.36 31.744-35.84 51.2-40.96 21.504-5.12 34.816-3.072 34.816-3.072-38.912-28.672-251.904 52.224-107.52 75.776 390.144 62.464 712.704-28.672 611.328-74.752M400.384 578.56s-178.176 43.008-63.488 56.32c49.152 6.144 146.432 5.12 235.52-3.072 73.728-6.144 147.456-19.456 147.456-19.456s-26.624 11.264-45.056 24.576c-181.248 48.128-530.432 26.624-430.08-23.552 88.064-39.936 155.648-34.816 155.648-34.816"
                  fill="#396397"
                  p-id="13763"
                ></path>
                <path
                  d="M418.816 1015.808c176.128 11.264 446.464-6.144 453.632-90.112 0 0-13.312 31.744-146.432 56.32-150.528 27.648-336.896 24.576-446.464 6.144 2.048 1.024 24.576 20.48 139.264 27.648"
                  fill="#396397"
                  p-id="13764"
                ></path>
              </svg>
            </div>
            <!-- Rust -->
            <div class="lang-particle particle-5">
              <svg
                t="1764519705526"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="10502"
                width="200"
                height="200"
              >
                <path
                  d="M341.333 796.445H227.556v113.778H113.778V682.668h113.778V568.891h113.777v227.554z m113.778-113.777V568.891h113.778v113.777h113.777v227.555H341.334V682.668h113.777z m341.333 0h113.778v227.555H796.444V796.445H682.667V568.891h113.777v113.777zM113.777 796.445H0V682.668h113.777v113.777z m910.223 0H910.223V682.668H1024v113.777zM227.556 455.109h113.777v113.778H113.778V227.555h113.778v227.554z m455.11 113.778H341.334V455.109h341.332v113.778z m227.556 0H682.667V455.109h113.777V227.555h113.778v341.332zM113.777 455.109H0V341.332h113.777v113.777z m910.223 0H910.223V341.332H1024v113.777z"
                  fill="#E8744B"
                  p-id="10503"
                ></path>
                <path
                  d="M455.111 682.668H341.333V568.891h113.778v113.777z m227.555 0H568.889V568.891h113.777v113.777zM455.111 113.777v113.778H341.333V113.777h113.778z"
                  fill="#222423"
                  p-id="10504"
                ></path>
                <path
                  d="M682.666 113.777v341.332H568.889V341.332H341.334V227.555h113.777V113.777h227.555z m113.778 227.555H682.667V227.555h113.777v113.777zM341.333 227.555H227.556V0h113.777v227.555z m113.778-113.778H341.334V0h113.777v113.777z"
                  fill="#E0DECF"
                  p-id="10505"
                ></path>
              </svg>
            </div>
            <!-- JSON -->
            <div class="lang-particle particle-6">
              <svg
                t="1764522711151"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="14886"
                width="200"
                height="200"
              >
                <path
                  d="M847.872 240.128v688c0 26.56-21.408 48-48 48h-576c-26.56 0-48-21.44-48-48v-832c0-26.592 21.44-48 48-48h432z"
                  fill="#E9EDED"
                  p-id="14887"
                ></path>
                <path
                  d="M160 768.128v160c0 35.456 28.544 64 64 64h576c35.456 0 64-28.544 64-64v-160H160z"
                  fill="#F17F53"
                  p-id="14888"
                ></path>
                <path
                  d="M847.872 240.128h-144c-26.56 0-48-21.44-48-48v-144"
                  fill="#F17F53"
                  p-id="14889"
                ></path>
                <path
                  d="M432.256 320.128c-35.2 0-64 28.8-64 64v32c0 18.016-14.016 32-32 32a16 16 0 0 0-15.936 12.992 16 16 0 0 0 0 0.064 16 16 0 0 0 4.736 14.56 16 16 0 0 0 2.496 1.92 16 16 0 0 0 4.448 1.92 16 16 0 0 0 3.136 0.48 16 16 0 0 0 1.12 0.064c17.984 0 32 13.984 32 32v32c0 35.2 28.8 64 64 64a16 16 0 1 0 0-32c-18.016 0-32-13.984-32-32v-32c0-19.136-8.736-36.256-22.208-48a63.68 63.68 0 0 0 22.208-48v-32c0-18.016 13.984-32 32-32a16 16 0 1 0 0-32z m125.856 0a16 16 0 0 0 1.632 32c18.016 0 32 13.984 32 32v32c0 19.168 8.736 36.224 22.208 48-13.44 11.744-22.208 28.864-22.208 48v32c0 18.016-13.984 32-32 32a16 16 0 1 0 0 32c35.2 0 64-28.8 64-64v-32c0-18.016 14.016-32 32-32a16 16 0 0 0 10.368-3.616 16 16 0 0 0 1.216-1.152 16 16 0 0 0-11.584-27.232c-17.984 0-32-13.984-32-32v-32c0-35.2-28.8-64-64-64a16 16 0 0 0-1.6 0zM496 384a16 16 0 0 0-16 16 16 16 0 0 0 16 16 16 16 0 0 0 16-16 16 16 0 0 0-16-16z m-0.256 63.808A16 16 0 0 0 480 464v96a16 16 0 1 0 32 0v-96a16 16 0 0 0-16.256-16.192z"
                  fill="#F17F53"
                  p-id="14890"
                ></path>
                <path
                  d="M720.576 799.616a16 16 0 0 0-1.632 0.064 16 16 0 0 0-15.008 17.312v126.816a16 16 0 1 0 32 0v-80l66.624 88.96a16 16 0 0 0 0.064 0.096l0.448 0.576a16 16 0 0 0 28.864-9.6v-127.68a16 16 0 0 0-16.256-16.224 16 16 0 0 0-15.744 16.256v79.68l-67.136-89.6a16 16 0 0 0-12.224-6.656zM303.744 800a16 16 0 0 0-15.744 16.256V912c0 9.152-6.848 16-16 16a15.616 15.616 0 0 1-16-16 16 16 0 0 0-16.256-16.192A16 16 0 0 0 224 912c0 26.304 21.696 48 48 48 24.768 0 45.152-19.296 47.488-43.52a16 16 0 0 0 0.512-4.224v-96A16 16 0 0 0 303.744 800z m288.256 0a80.256 80.256 0 0 0-80 80c0 44 36 80 80 80s80-36 80-80-36-80-80-80z m-193.888 0.128a16 16 0 0 0-1.984 0.384c-24.64 1.92-44.384 22.528-44.384 47.616 0 25.28 20.096 46.08 44.992 47.68a16 16 0 0 0 3.008 0.32h32c9.152 0 16 6.848 16 16 0 9.152-6.848 16-16 16h-64a16 16 0 1 0 0 32h64a16 16 0 0 0 3.328-0.384 48.096 48.096 0 0 0 44.672-47.616c0-25.152-19.84-45.888-44.544-47.68a16 16 0 0 0-3.456-0.32h-30.88a16 16 0 0 0-1.12 0 15.616 15.616 0 0 1-16-16c0-9.152 6.88-16 16-16h64a16 16 0 1 0 0-32h-62.88a16 16 0 0 0-1.12 0 16 16 0 0 0-1.6 0zM592 832c26.688 0 48 21.312 48 48s-21.312 48-48 48-48-21.312-48-48 21.312-48 48-48z"
                  fill="#E9EDED"
                  p-id="14891"
                ></path>
              </svg>
            </div>
            <!-- JavaScript -->
            <div class="lang-particle particle-7">
              <svg viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg">
                <rect width="256" height="256" fill="#F7DF1E" rx="28" />
                <path
                  d="M67.312 213.932l19.59-11.856c3.78 6.701 7.218 12.371 15.465 12.371 7.905 0 12.889-3.092 12.889-15.12v-81.798h24.057v82.138c0 24.917-14.606 36.259-35.916 36.259-19.245 0-30.416-9.967-36.087-21.996M152.381 211.354l19.588-11.341c5.157 8.421 11.859 14.607 23.715 14.607 9.969 0 16.325-4.984 16.325-11.858 0-8.248-6.53-11.17-17.528-15.98l-6.013-2.58c-17.357-7.387-28.87-16.667-28.87-36.257 0-18.044 13.747-31.792 35.228-31.792 15.294 0 26.292 5.328 34.196 19.247l-18.732 12.03c-4.125-7.389-8.591-10.31-15.465-10.31-7.046 0-11.514 4.468-11.514 10.31 0 7.217 4.468 10.14 14.778 14.608l6.014 2.577c20.45 8.765 31.963 17.7 31.963 37.804 0 21.654-17.012 33.51-39.867 33.51-22.339 0-36.774-10.654-43.819-24.574"
                  fill="#000"
                />
              </svg>
            </div>
            <!-- Go -->
            <div class="lang-particle particle-8">
              <svg
                t="1764521630454"
                class="icon"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
                p-id="5651"
                width="200"
                height="200"
              >
                <path
                  d="M206.528 547.072c1.28 25.216 26.368 13.504 37.76 5.632 10.88-7.488 14.08-1.28 14.976-16 0.64-9.728 1.728-19.392 1.216-29.12a71.424 71.424 0 0 0-47.616 12.16c-6.912 4.992-19.84 21.056-6.336 27.328"
                  fill="#F6D2A2"
                  p-id="5652"
                ></path>
                <path
                  d="M206.528 547.072c3.648-1.344 7.552-2.304 10.048-5.632z"
                  fill="#C6B198"
                  p-id="5653"
                ></path>
                <path
                  d="M264.704 246.848c-96.448-27.072-24.704-149.824 52.736-99.328l-52.736 99.328z m428.672-108.544c76.352-53.632 145.28 67.392 56.576 97.792l-56.576-97.792z"
                  fill="#6AD7E5"
                  p-id="5654"
                ></path>
                <path
                  d="M709.76 857.28c19.392 11.968 54.848 48.256 25.792 65.92-27.968 25.6-43.648-28.16-68.16-35.584 10.56-14.336 23.936-27.456 42.368-30.336z m-346.496 40.96c-22.784 3.52-35.584 24.064-54.592 34.56-17.92 10.624-24.704-3.456-26.304-6.336-2.816-1.28-2.56 1.216-6.912-3.2-16.64-26.112 17.28-45.248 34.88-58.24 24.576-4.992 39.936 16.32 52.928 33.28z"
                  fill="#F6D2A2"
                  p-id="5655"
                ></path>
                <path
                  d="M268.736 212.992C256 206.272 246.656 197.12 254.464 182.4c7.168-13.632 20.608-12.16 33.28-5.44l-19.008 36.032z m461.12-12.8c12.736-6.72 22.08-15.872 14.272-30.592-7.232-13.632-20.608-12.16-33.28-5.44l19.008 36.032z"
                  fill="#000000"
                  p-id="5656"
                ></path>
                <path
                  d="M817.472 543.872c-1.28 25.216-26.368 13.568-37.76 5.696-10.88-7.488-14.08-1.28-14.976-16-0.64-9.728-1.728-19.456-1.216-29.184 16.384-1.472 34.176 2.368 47.616 12.16 6.912 4.992 19.84 21.056 6.336 27.328z"
                  fill="#F6D2A2"
                  p-id="5657"
                ></path>
                <path
                  d="M817.472 543.872c-3.648-1.344-7.552-2.304-10.048-5.632z"
                  fill="#C6B198"
                  p-id="5658"
                ></path>
                <path
                  d="M502.336 87.296c96.576 0 187.136 13.824 234.304 106.624 42.368 104 27.328 216.192 33.792 326.08 5.504 94.4 17.856 203.456-25.984 290.944-46.08 91.968-161.152 115.2-256 111.744-74.432-2.688-164.48-26.944-206.464-95.04-49.344-79.808-25.984-198.528-22.4-287.36 4.224-105.28-28.48-210.816 6.08-313.792 35.84-106.816 132.544-130.944 236.672-139.2"
                  fill="#6AD7E5"
                  p-id="5659"
                ></path>
                <path
                  d="M519.36 216.96c17.344 100.8 182.144 74.112 158.464-27.52-21.248-91.2-164.224-65.92-158.464 27.52z m-196.864 16.32c22.4 87.68 162.944 65.28 157.696-22.784-6.4-105.408-179.2-85.12-157.696 22.784zM539.264 337.92c0.064 13.12 2.944 27.84 0.512 41.728-3.392 6.4-9.92 7.04-15.616 9.6a22.912 22.912 0 0 1-17.536-13.696c-1.92-15.936 0.768-31.36 1.28-47.232l31.36 9.6z"
                  fill="#FFFFFF"
                  p-id="5660"
                ></path>
                <path
                  d="M337.472 218.944c0 6.848 2.56 13.376 6.976 18.176 4.48 4.8 10.496 7.552 16.768 7.552a22.848 22.848 0 0 0 16.768-7.552 26.88 26.88 0 0 0 6.976-18.176 26.88 26.88 0 0 0-6.976-18.176 22.848 22.848 0 0 0-16.768-7.488 22.848 22.848 0 0 0-16.768 7.488 26.88 26.88 0 0 0-6.976 18.176z"
                  fill="#000000"
                  p-id="5661"
                ></path>
                <path
                  d="M366.464 224.768c0 0.832 0.128 1.664 0.384 2.496 0.256 0.768 0.64 1.536 1.216 2.176 0.512 0.64 1.152 1.088 1.792 1.408a4.928 4.928 0 0 0 4.352 0 5.632 5.632 0 0 0 1.792-1.408 6.72 6.72 0 0 0 1.28-2.176 7.488 7.488 0 0 0 0.32-2.56 7.488 7.488 0 0 0-0.384-2.496 6.72 6.72 0 0 0-1.216-2.112 5.632 5.632 0 0 0-1.792-1.472 4.928 4.928 0 0 0-4.352 0 5.632 5.632 0 0 0-1.792 1.472 6.72 6.72 0 0 0-1.28 2.112 7.488 7.488 0 0 0-0.32 2.56z"
                  fill="#FFFFFF"
                  p-id="5662"
                ></path>
                <path
                  d="M536.704 212.544c0 6.848 2.432 13.44 6.848 18.176a22.272 22.272 0 0 0 16.512 7.552c6.144 0 12.096-2.688 16.448-7.552a27.072 27.072 0 0 0 6.848-18.176 27.072 27.072 0 0 0-6.848-18.112 22.272 22.272 0 0 0-16.448-7.552 22.272 22.272 0 0 0-16.512 7.552 27.072 27.072 0 0 0-6.848 18.112z"
                  fill="#000000"
                  p-id="5663"
                ></path>
                <path
                  d="M565.12 218.368c0 1.728 0.64 3.392 1.664 4.608a5.12 5.12 0 0 0 3.84 1.92 5.12 5.12 0 0 0 3.904-1.92 7.168 7.168 0 0 0 1.6-4.608 7.616 7.616 0 0 0-0.384-2.56 6.784 6.784 0 0 0-1.216-2.112 5.568 5.568 0 0 0-1.792-1.472 4.736 4.736 0 0 0-4.224 0 5.568 5.568 0 0 0-1.792 1.472 6.72 6.72 0 0 0-1.152 2.112 7.616 7.616 0 0 0-0.448 2.56zM471.488 336.512c-10.368 25.088 5.76 75.264 33.856 38.272-2.048-15.936 0.704-31.36 1.28-47.232l-35.2 8.96z"
                  fill="#FFFFFF"
                  p-id="5664"
                ></path>
                <path
                  d="M475.008 288.192c-19.264 1.664-35.072 24.576-25.024 42.752 13.248 24 42.88-2.112 61.44 0.32 21.184 0.448 38.656 22.464 55.68 3.968 19.008-20.544-8.128-40.576-29.44-49.536l-62.656 2.496z"
                  fill="#F6D2A2"
                  p-id="5665"
                ></path>
                <path
                  d="M472.576 287.168c-1.408-33.408 62.272-37.568 69.76-9.6 7.552 27.904-66.624 34.368-69.76 9.6 0 0-2.56-19.776 0 0z"
                  fill="#000000"
                  p-id="5666"
                ></path>
              </svg>
            </div>
          </div>
          <!-- 发光能量环 -->
          <div class="energy-rings">
            <div class="ring ring-1"></div>
            <div class="ring ring-2"></div>
            <div class="ring ring-3"></div>
          </div>
          <div class="logo-display">
            <img
              src="/maafw.png"
              alt="MaaFramework Logo"
              class="main-logo"
              fetchpriority="high"
              loading="eager"
            />
          </div>
        </div>
      </div>
    </div>

    <div class="scroll-indicator" @click="scrollToNext">
      <div class="scroll-arrow"></div>
    </div>
  </section>
</template>

<script setup lang="ts">
import type { HeroContent } from "../../locales/homepage/types";

defineProps<{
  content: HeroContent;
  lang: "zh" | "en";
  isLightMode: boolean;
}>();

const scrollToNext = () => {
  const nextSection = document.querySelector(
    ".feature-showcase"
  ) as HTMLElement;
  if (nextSection) {
    nextSection.scrollIntoView({ behavior: "smooth" });
  }
};
</script>

<style scoped lang="scss">
.hero-section {
  position: relative;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: visible;
  padding-top: 80px;
  z-index: 1;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 1280px;
  width: 90%;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: center;
  padding: 40px 0;
}

.hero-left {
  .hero-title {
    font-size: 4rem;
    font-weight: 800;
    margin: 0 0 24px 0;
    line-height: 1.1;

    .title-gradient {
      background: linear-gradient(120deg, #bd34fe 30%, #47caff);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-shadow: 0 0 40px rgba(189, 52, 254, 0.3);
      animation: titleShine 3s ease-in-out infinite;
    }
  }

  .hero-subtitle {
    font-size: 1.5rem;
    color: #e0e7ff;
    margin: 0 0 16px 0;
    font-weight: 500;
  }

  .hero-description {
    font-size: 1.125rem;
    color: #b0bac9;
    margin: 0 0 40px 0;
    line-height: 1.6;
  }

  // 日间模式
  .hero-section.light-mode & {
    .hero-subtitle {
      color: #0f172a;
      font-weight: 600;
    }

    .hero-description {
      color: #334155;
    }
  }
}

@keyframes titleShine {
  0%,
  100% {
    filter: brightness(1);
  }
  50% {
    filter: brightness(1.2);
  }
}

.hero-buttons {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 32px;
  font-size: 1rem;
  font-weight: 600;
  text-decoration: none;
  border-radius: 12px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.6s, height 0.6s;
  }

  &:hover::before {
    width: 300px;
    height: 300px;
  }

  &-primary {
    background: linear-gradient(135deg, #bd34fe, #47caff);
    color: white;
    box-shadow: 0 4px 24px rgba(189, 52, 254, 0.4);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 32px rgba(189, 52, 254, 0.6);
    }
  }

  &-secondary {
    background: rgba(71, 202, 255, 0.1);
    color: #47caff;
    border: 2px solid #47caff;

    &:hover {
      background: rgba(71, 202, 255, 0.2);
      transform: translateY(-2px);
      box-shadow: 0 8px 32px rgba(71, 202, 255, 0.3);
    }
  }
}

.hero-right {
  position: relative;
}

.hero-visual {
  position: relative;
  width: 100%;
  height: 500px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.language-particles {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  user-select: none;
}

.lang-particle {
  position: absolute;
  width: 50px;
  height: 50px;
  animation: langFloat 10s ease-in-out infinite;
  opacity: 0.85;
  transition: all 0.3s ease;
  filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.3));
  user-select: none;
  -webkit-tap-highlight-color: transparent;
  will-change: transform;

  svg {
    width: 100%;
    height: 100%;
    display: block;
    pointer-events: none;
  }

  &:hover {
    transform: scale(1.2);
    opacity: 1;
    filter: drop-shadow(0 8px 24px rgba(71, 202, 255, 0.5));
    z-index: 10;
  }

  // Python
  &.particle-1 {
    top: 8%;
    left: 16%;
    animation-delay: 0s;
    animation-duration: 9s;
  }

  // C++
  &.particle-2 {
    top: 20%;
    right: 8%;
    animation-delay: -1.8s;
    animation-duration: 10s;
    width: 55px;
    height: 55px;
  }

  // C#
  &.particle-3 {
    top: 45%;
    right: 4%;
    animation-delay: -3.6s;
    animation-duration: 11s;
    width: 48px;
    height: 48px;
  }

  // Java
  &.particle-4 {
    bottom: 20%;
    right: 12%;
    animation-delay: -5.4s;
    animation-duration: 9.5s;
    width: 48px;
    height: 48px;
  }

  // Rust
  &.particle-5 {
    bottom: 12%;
    left: 15%;
    animation-delay: -2.7s;
    animation-duration: 10.5s;
    width: 52px;
    height: 52px;
  }

  // JSON
  &.particle-6 {
    bottom: 50%;
    left: 6%;
    animation-delay: -4.2s;
    animation-duration: 8.5s;
    width: 54px;
    height: 54px;
  }

  // JavaScript
  &.particle-7 {
    top: 0%;
    left: 40%;
    animation-delay: -1.2s;
    animation-duration: 9.8s;
    width: 46px;
    height: 46px;
  }

  // Go
  &.particle-8 {
    top: 6%;
    left: 63%;
    animation-delay: -6s;
    animation-duration: 10.2s;
    width: 56px;
    height: 56px;
  }
}

@keyframes langFloat {
  0%,
  100% {
    transform: translateY(0) translateX(0);
    opacity: 0.85;
  }
  50% {
    transform: translateY(-20px) translateX(0);
    opacity: 0.75;
  }
}

.energy-rings {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  pointer-events: none;
  user-select: none;
}

.ring {
  position: absolute;
  top: 50%;
  left: 50%;
  border-radius: 50%;
  border: 2px solid;
  transform: translate(-50%, -50%);
  animation: ringPulse 4s ease-in-out infinite;
  will-change: transform, opacity;

  &.ring-1 {
    width: 280px;
    height: 280px;
    border-color: rgba(189, 52, 254, 0.4);
    animation-delay: 0s;
  }
  &.ring-2 {
    width: 360px;
    height: 360px;
    border-color: rgba(71, 202, 255, 0.3);
    animation-delay: -1.3s;
  }
  &.ring-3 {
    width: 440px;
    height: 440px;
    border-color: rgba(0, 255, 136, 0.2);
    animation-delay: -2.6s;
  }
}

@keyframes ringPulse {
  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    opacity: 0.3;
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
    opacity: 0.6;
  }
}

.logo-display {
  position: relative;
  z-index: 10;
  width: 350px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: logoFloat 6s ease-in-out infinite;
  pointer-events: none;
  user-select: none;
  will-change: transform;

  .main-logo {
    width: 100%;
    height: 100%;
    object-fit: contain;
    filter: drop-shadow(0 0 40px rgba(71, 202, 255, 0.4));
    animation: logoGlow 3s ease-in-out infinite;
    pointer-events: none;
    user-select: none;
    -webkit-user-drag: none;
    will-change: filter;
  }
}

@keyframes logoFloat {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-20px);
  }
}

@keyframes logoGlow {
  0%,
  100% {
    filter: drop-shadow(0 0 40px rgba(71, 202, 255, 0.4));
  }
  50% {
    filter: drop-shadow(0 0 60px rgba(189, 52, 254, 0.6));
  }
}

.scroll-indicator {
  position: absolute;
  bottom: 40px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 10;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &:hover {
    transform: translateX(-50%) scale(1.1);

    .scroll-arrow {
      border-color: #bd34fe;
      box-shadow: 0 0 20px rgba(189, 52, 254, 0.5);
    }
  }

  .scroll-arrow {
    width: 30px;
    height: 50px;
    border: 2px solid #47caff;
    border-radius: 20px;
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 8px;
      left: 50%;
      width: 6px;
      height: 6px;
      background: #47caff;
      border-radius: 50%;
      transform: translateX(-50%);
      animation: scrollBounce 2s infinite;
    }
  }

  // 日间模式
  .hero-section.light-mode & {
    .scroll-arrow {
      border-color: #2563eb;

      &::before {
        background: #2563eb;
      }
    }

    &:hover .scroll-arrow {
      border-color: #bd34fe;
      box-shadow: 0 0 20px rgba(189, 52, 254, 0.4);
    }
  }
}

@keyframes scrollBounce {
  0%,
  100% {
    top: 8px;
    opacity: 1;
  }
  50% {
    top: 28px;
    opacity: 0.5;
  }
}

@media (max-width: 1024px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 60px;
    text-align: center;
  }

  .hero-left {
    .hero-title {
      font-size: 3rem;
    }
  }

  .hero-buttons {
    justify-content: center;
  }

  .hero-right {
    display: flex;
    justify-content: center;
  }

  .hero-visual {
    height: 400px;
  }

  .lang-particle {
    width: 40px;
    height: 40px;

    &.particle-2 {
      width: 45px;
      height: 45px;
    }
  }

  .ring {
    &.ring-1 {
      width: 230px;
      height: 230px;
    }
    &.ring-2 {
      width: 300px;
      height: 300px;
    }
    &.ring-3 {
      width: 370px;
      height: 370px;
    }
  }

  .logo-display {
    width: 320px;
    height: 320px;
  }
}

@media (max-width: 768px) {
  .hero-section {
    min-height: auto;
    padding: 100px 0 60px;
  }

  .hero-left {
    .hero-title {
      font-size: 2.5rem;
    }

    .hero-subtitle {
      font-size: 1.25rem;
    }

    .hero-description {
      font-size: 1rem;
    }
  }

  .hero-visual {
    height: 300px;
  }

  .lang-particle {
    width: 32px;
    height: 32px;

    &.particle-2,
    &.particle-5 {
      width: 36px;
      height: 36px;
    }
  }

  .ring {
    &.ring-1 {
      width: 190px;
      height: 190px;
    }
    &.ring-2 {
      width: 240px;
      height: 240px;
    }
    &.ring-3 {
      width: 290px;
      height: 290px;
    }
  }

  .logo-display {
    width: 280px;
    height: 280px;
  }

  .btn {
    width: 100%;
    max-width: 300px;
  }
}
</style>
