export const SpinnerDefaultComponent = () => {
  return (
    <>
      <div>
        <svg className="w-5 h-5 mr-2 animate-spin" viewBox="0 0 24 24">
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      </div>
    </>
  );
};

export const SpinnerOneComponent = () => {
  return (
    <>
      {/* Spinner one */}
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <circle
            cx="12"
            cy="12"
            r="10"
            stroke="#e6e6e6"
            strokeWidth="3"
            fill="none"
          />

          <defs>
            <linearGradient
              id="spinnerGradient"
              x1="0%"
              y1="0%"
              x2="100%"
              y2="0%"
            >
              <stop offset="0%" stop-color="#3498db" stop-opacity="0.9" />
              <stop offset="100%" stop-color="#3498db" stop-opacity="0.3" />
            </linearGradient>
          </defs>

          <path
            d="M12 2C6.48 2 2 6.48 2 12"
            stroke="url(#spinnerGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            fill="none"
          >
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 12 12"
              to="360 12 12"
              dur="1s"
              repeatCount="indefinite"
              additive="sum"
            />
          </path>

          <circle cx="12" cy="2" r="1.5" fill="#3498db">
            <animateTransform
              attributeName="transform"
              type="rotate"
              from="0 12 12"
              to="360 12 12"
              dur="1s"
              repeatCount="indefinite"
              additive="sum"
            />
          </circle>
        </svg>
      </div>
    </>
  );
};

export const SpinnerTwoComponent = () => {
  return (
    <>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 50 50">
          <g fill="none" stroke-width="3" stroke-linecap="round">
            <path d="M25 10 L25 2" stroke="#4285F4">
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="0 25 25;360 25 25"
                dur="1.2s"
                repeatCount="indefinite"
                begin="0s"
              />
            </path>

            <path d="M25 10 L25 2" stroke="#EA4335" opacity="0.9">
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="45 25 25;405 25 25"
                dur="1.2s"
                repeatCount="indefinite"
                begin="0s"
              />
            </path>

            <path d="M25 10 L25 2" stroke="#FBBC05" opacity="0.8">
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="90 25 25;450 25 25"
                dur="1.2s"
                repeatCount="indefinite"
                begin="0s"
              />
            </path>

            <path d="M25 10 L25 2" stroke="#34A853" opacity="0.7">
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="135 25 25;495 25 25"
                dur="1.2s"
                repeatCount="indefinite"
                begin="0s"
              />
            </path>

            <path d="M25 10 L25 2" stroke="#4285F4" opacity="0.6">
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="180 25 25;540 25 25"
                dur="1.2s"
                repeatCount="indefinite"
                begin="0s"
              />
            </path>

            <path d="M25 10 L25 2" stroke="#EA4335" opacity="0.5">
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="225 25 25;585 25 25"
                dur="1.2s"
                repeatCount="indefinite"
                begin="0s"
              />
            </path>

            <path d="M25 10 L25 2" stroke="#FBBC05" opacity="0.4">
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="270 25 25;630 25 25"
                dur="1.2s"
                repeatCount="indefinite"
                begin="0s"
              />
            </path>

            <path d="M25 10 L25 2" stroke="#34A853" opacity="0.3">
              <animateTransform
                attributeName="transform"
                type="rotate"
                values="315 25 25;675 25 25"
                dur="1.2s"
                repeatCount="indefinite"
                begin="0s"
              />
            </path>
          </g>

          <circle cx="25" cy="25" r="2" fill="#4285F4" />
        </svg>
      </div>
    </>
  );
};

export const SpinnerThreeComponent = () => {
  return (
    <>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 60">
          <circle
            cx="30"
            cy="30"
            r="25"
            stroke="#8A2BE2"
            strokeWidth="2"
            fill="none"
          >
            <animate
              attributeName="r"
              values="25;28;25"
              dur="1.5s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              values="1;0.8;1"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>

          <g strokeWidth="4" strokeLinecap="round">
            <path d="M30 15 A15 15 0 0 1 45 30" fill="none" stroke="#8A2BE2">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 30 30"
                to="360 30 30"
                dur="1s"
                repeatCount="indefinite"
              />
            </path>

            <path d="M30 20 A10 10 0 0 1 40 30" fill="none" stroke="#9370DB">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 30 30"
                to="360 30 30"
                dur="0.8s"
                repeatCount="indefinite"
              />
            </path>

            <path d="M30 25 A5 5 0 0 1 35 30" fill="none" stroke="#BA55D3">
              <animateTransform
                attributeName="transform"
                type="rotate"
                from="0 30 30"
                to="360 30 30"
                dur="0.6s"
                repeatCount="indefinite"
              />
            </path>
          </g>

          <circle cx="30" cy="30" r="3" fill="#8A2BE2">
            <animate
              attributeName="r"
              values="3;4;3"
              dur="1.5s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
    </>
  );
};

export const SpinnerFourComponent = () => {
  return (
    <>
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
          <g fill="#3498db">
            <circle cx="40" cy="10" r="6">
              <animate
                attributeName="opacity"
                values="1;0.3;1"
                dur="1.5s"
                repeatCount="indefinite"
                begin="0s"
              />
            </circle>

            <circle cx="57.32" cy="20" r="6">
              <animate
                attributeName="opacity"
                values="1;0.3;1"
                dur="1.5s"
                repeatCount="indefinite"
                begin="0.125s"
              />
            </circle>

            <circle cx="65" cy="40" r="6">
              <animate
                attributeName="opacity"
                values="1;0.3;1"
                dur="1.5s"
                repeatCount="indefinite"
                begin="0.25s"
              />
            </circle>

            <circle cx="57.32" cy="60" r="6">
              <animate
                attributeName="opacity"
                values="1;0.3;1"
                dur="1.5s"
                repeatCount="indefinite"
                begin="0.375s"
              />
            </circle>

            <circle cx="40" cy="70" r="6">
              <animate
                attributeName="opacity"
                values="1;0.3;1"
                dur="1.5s"
                repeatCount="indefinite"
                begin="0.5s"
              />
            </circle>

            <circle cx="22.68" cy="60" r="6">
              <animate
                attributeName="opacity"
                values="1;0.3;1"
                dur="1.5s"
                repeatCount="indefinite"
                begin="0.625s"
              />
            </circle>

            <circle cx="15" cy="40" r="6">
              <animate
                attributeName="opacity"
                values="1;0.3;1"
                dur="1.5s"
                repeatCount="indefinite"
                begin="0.75s"
              />
            </circle>

            <circle cx="22.68" cy="20" r="6">
              <animate
                attributeName="opacity"
                values="1;0.3;1"
                dur="1.5s"
                repeatCount="indefinite"
                begin="0.875s"
              />
            </circle>
          </g>
        </svg>
      </div>
    </>
  );
};
