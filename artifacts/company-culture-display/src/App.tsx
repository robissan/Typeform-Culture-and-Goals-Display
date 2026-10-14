import { type ReactNode, useEffect, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';

const queryClient = new QueryClient();

type CompanyMetric = {
  name: 'MRR' | 'MAU';
  currentValue: number;
  targetValue: number;
  unit: string;
  progressPercent: number;
  monthlyHistory: number[];
};

type CultureMoment = {
  id: string;
  type: 'birthday' | 'work anniversary' | 'value';
  displayName: string;
  detail: string;
  date: string;
};

type BarceptionAggregate = {
  month: string;
  coffeeServings: number;
  beerServings: number;
};

const metrics: CompanyMetric[] = [
  {
    name: 'MRR',
    currentValue: 4.28,
    targetValue: 5.2,
    unit: 'M USD',
    progressPercent: 82.3,
    monthlyHistory: [43, 49, 46, 55, 59, 57, 63, 68, 71, 76, 80, 82],
  },
  {
    name: 'MAU',
    currentValue: 1.84,
    targetValue: 2.3,
    unit: 'M people',
    progressPercent: 80,
    monthlyHistory: [41, 45, 43, 52, 55, 59, 62, 64, 70, 73, 77, 80],
  },
];

const moments: CultureMoment[] = [
  {
    id: 'moment-a',
    type: 'birthday',
    displayName: 'Mara Chen',
    detail: 'Design systems · Barcelona',
    date: 'Today',
  },
  {
    id: 'moment-b',
    type: 'work anniversary',
    displayName: 'Leo Martins',
    detail: 'Customer education · Lisbon',
    date: '3 years',
  },
  {
    id: 'moment-c',
    type: 'value',
    displayName: 'Win together',
    detail: 'A small thank-you for the people who made the launch feel easy.',
    date: 'This week',
  },
];

const barception: BarceptionAggregate = {
  month: 'May',
  coffeeServings: 1286,
  beerServings: 214,
};

const conversationPrompts = [
  'What’s one thing we should celebrate from this month?',
  'Who made your work a little easier this week?',
  'What would you love to learn from another team?',
];

function MetricBlock({ metric }: { metric: CompanyMetric }) {
  const value = metric.currentValue.toFixed(2);
  const target = metric.targetValue.toFixed(1);
  const fill = Math.min(metric.progressPercent, 100);
  const monthNames = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'];

  return (
    <section className="metric" aria-label={`${metric.name} sample performance`}>
      <div className="metric-top">
        <span className="metric-name">{metric.name === 'MRR' ? 'Monthly recurring revenue' : 'Monthly active users'}</span>
        <span className="metric-delta">On the way</span>
      </div>
      <div className="metric-value" data-testid={`metric-value-${metric.name.toLowerCase()}`}>
        {metric.name === 'MRR' ? '$' : ''}{value}<small> {metric.unit}</small>
      </div>
      <div className="metric-target">
        Target: {metric.name === 'MRR' ? '$' : ''}{target} {metric.unit}
      </div>
      <div
        className="progress-track"
        role="progressbar"
        aria-label={`${metric.name} progress to target`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(metric.progressPercent)}
        aria-valuetext={`${metric.progressPercent}% of target`}
      >
        <div className="progress-fill" style={{ width: `${fill}%` }} />
      </div>
      <div className="progress-caption">
        <strong>{metric.progressPercent}% of target</strong>
        <span>{100 - metric.progressPercent}% to go</span>
      </div>
      <div className="chart-title">12-month path · sample</div>
      <div className="chart" role="img" aria-label={`${metric.name} monthly sample history, trending upward over 12 months`}>
        {metric.monthlyHistory.map((monthValue, index) => (
          <div className="chart-column" key={`${metric.name}-${index}`} title={`${monthNames[index]}: ${monthValue}%`}>
            <div className="chart-bar" style={{ height: `${monthValue}%` }} />
          </div>
        ))}
      </div>
      <div className="chart-labels" aria-hidden="true">
        <span>JUN</span><span>SEP</span><span>DEC</span><span>MAR</span><span>MAY</span>
      </div>
    </section>
  );
}

function CultureMoments() {
  return (
    <section className="panel culture-panel" aria-labelledby="moments-title">
      <div className="moments-heading">
        <div>
          <div className="eyebrow">People, not just numbers</div>
          <h2 id="moments-title">A little good news</h2>
        </div>
        <span className="moment-count" aria-label={`${moments.length} moments`}>{moments.length}</span>
      </div>
      <div className="moment-list">
        {moments.map((moment, index) => (
          <article className="moment" key={moment.id} data-testid={`culture-moment-${moment.id}`}>
            <div className="moment-icon" aria-hidden="true">{index === 0 ? 'B' : index === 1 ? '3' : 'W'}</div>
            <div>
              <div className="moment-type">{moment.type}</div>
              <div className="moment-name">{moment.displayName}</div>
              <div className="moment-detail">{moment.detail}</div>
            </div>
            <div className="moment-date">{moment.date}</div>
          </article>
        ))}
      </div>
      <div className="value-note">“Good work is something we make possible for each other.”</div>
      <div className="fiction-note">Fictional people and examples for this prototype.</div>
    </section>
  );
}

function KioskHome() {
  const [promptIndex, setPromptIndex] = useState(0);
  const [promptVisible, setPromptVisible] = useState(false);
  const [time, setTime] = useState(() => new Date());

  useEffect(() => {
    const interval = window.setInterval(() => setTime(new Date()), 60_000);
    return () => window.clearInterval(interval);
  }, []);

  const showAnotherPrompt = () => {
    setPromptIndex((current) => (current + 1) % conversationPrompts.length);
    setPromptVisible(true);
  };

  const dateLabel = new Intl.DateTimeFormat('en', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(time);

  return (
    <main className="kiosk" data-testid="company-culture-kiosk">
      <div className="kiosk-wrap">
        <header className="masthead">
          <div className="brand" aria-label="Typeform Commons">
            <span className="brand-mark" aria-hidden="true">t</span>
            <span>typeform <span style={{ fontWeight: 400 }}>commons</span></span>
          </div>
          <div className="masthead-note">A shared snapshot · {dateLabel}</div>
        </header>

        <section className="hero" aria-labelledby="page-title">
          <div>
            <div className="eyebrow">The work. The people. The in-between.</div>
            <h1 id="page-title">We make progress<br /> <span>together.</span></h1>
          </div>
          <p className="hero-aside">
            This is a place to <strong>see what we’re building</strong>, notice the people behind it, and start a conversation.
            Not a scorecard. A moment to connect.
          </p>
        </section>

        <section className="layer-rail" aria-label="Three things on this display">
          <div className="layer"><span className="layer-number">01</span><span><b>Our progress</b>Direction, with room for context.</span></div>
          <div className="layer"><span className="layer-number">02</span><span><b>Our people</b>Milestones worth noticing.</span></div>
          <div className="layer"><span className="layer-number">03</span><span><b>Our everyday</b>Little moments around the office.</span></div>
        </section>

        <div className="main-grid">
          <section className="panel progress-panel" aria-labelledby="progress-title">
            <div className="section-heading">
              <div>
                <div className="eyebrow">A wider view</div>
                <h2 id="progress-title">Where we’re headed</h2>
              </div>
              <span className="sample-tag">Illustrative sample data</span>
            </div>
            <div className="metrics">
              {metrics.map((metric) => <MetricBlock key={metric.name} metric={metric} />)}
            </div>
          </section>
          <CultureMoments />
        </div>

        <div className="lower-grid">
          <section className="panel barception" aria-labelledby="barception-title">
            <div>
              <div className="eyebrow">A tiny office ritual</div>
              <h2 className="barception-title" id="barception-title">The barception tally</h2>
              <p className="barception-copy">
                {barception.month}’s shared refreshment tally, shown in aggregate only. Coffee and beer are not productivity measures.
              </p>
            </div>
            <div className="beverage-stats" aria-label={`${barception.month} illustrative aggregate servings`}>
              <div className="bev"><strong>{barception.coffeeServings.toLocaleString()}</strong><span>coffee servings</span></div>
              <div className="bev"><strong>{barception.beerServings.toLocaleString()}</strong><span>beer servings</span></div>
            </div>
          </section>
          <section className="panel conversation" aria-live="polite">
            <div>
              <div className="eyebrow">A question for the hallway</div>
              <p>{promptVisible ? conversationPrompts[promptIndex] : 'Good conversations begin with a good question.'}</p>
            </div>
            <button type="button" onClick={showAnotherPrompt} data-testid="button-conversation-prompt">
              {promptVisible ? 'Another question' : 'Start a conversation'}
            </button>
          </section>
        </div>

        <footer className="footer">
          <div><strong>Prototype display.</strong> Company and beverage figures are illustrative sample data; cultural names and moments are fictional examples.</div>
          <div className="refresh-note">No live employee or business data connected.</div>
        </footer>
      </div>
    </main>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={KioskHome} />
      <Route component={NotFound} />
    </Switch>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <RoutedErrorBoundary><Router /></RoutedErrorBoundary>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
