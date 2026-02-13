import { Space_Grotesk } from "next/font/google";
import "./cash001.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function Cash001Page() {
  return (
    <div className={`cash001 ${spaceGrotesk.className}`}>
      <div className="cash001__shell">
        <div className="cash001__header">
          <div>
            <p className="cash001__eyebrow">cash001</p>
            <h1 className="cash001__title">Wallet Paint-Draw Sequence</h1>
          </div>
          <p className="cash001__subtitle">
            7-frame UI animation: single card, grid reveal, zoom focus, then a
            liquid paint draw to the final wallet state.
          </p>
        </div>
        <div className="cash001__stage">
          <div className="cash001__phone" role="img" aria-label="Wallet animation sequence">
            <div className="cash001__pattern" />

            <div className="cash001__single">
              <div className="cash001__card cash001__card--large">
                <div className="cash001__card-top">
                  <span className="cash001__badge">New</span>
                  <div className="cash001__coin" />
                </div>
                <div className="cash001__card-body">
                  <div className="cash001__amount">$0.36</div>
                  <div className="cash001__label">Cashback</div>
                </div>
              </div>
            </div>

            <div className="cash001__grid">
              <div className="cash001__mini cash001__mini--focus">
                <div className="cash001__mini-top" />
              </div>
              <div className="cash001__mini">
                <div className="cash001__mini-top" />
              </div>
              <div className="cash001__mini">
                <div className="cash001__mini-top" />
              </div>
              <div className="cash001__mini">
                <div className="cash001__mini-top" />
              </div>
            </div>

            <div className="cash001__final">
              <div className="cash001__final-card">
                <div className="cash001__paint-blob" />
                <div className="cash001__final-top">
                  <span className="cash001__badge">New</span>
                  <div className="cash001__coin" />
                </div>
                <div className="cash001__final-body">
                  <div className="cash001__amount">$0.36</div>
                  <div className="cash001__label">Cashback</div>
                </div>
              </div>
            </div>

            <div className="cash001__frame" />
          </div>
        </div>
      </div>
    </div>
  );
}
