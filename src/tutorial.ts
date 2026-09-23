export interface Tutorial {
  motivation: string;
  steps: { title: string; body: string }[];
  experiment: { prompt: string; hint: string };
}

/** Plain text nodes keep authored explanations and imported source out of HTML parsing. */
export function renderTutorial(container: HTMLElement, tutorial?: Tutorial): void {
  container.replaceChildren();
  container.hidden = !tutorial;
  if (!tutorial) return;
  const eyebrow = document.createElement('p'); eyebrow.className = 'eyebrow'; eyebrow.textContent = 'A GUIDED READING';
  const heading = document.createElement('h3'); heading.textContent = 'Work through the enchantment';
  const introduction = document.createElement('p'); introduction.textContent = tutorial.motivation;
  const steps = document.createElement('ol'); steps.className = 'tutorial-steps';
  for (const step of tutorial.steps) {
    const item = document.createElement('li'), title = document.createElement('h4'), body = document.createElement('p');
    title.textContent = step.title; body.textContent = step.body; item.append(title, body); steps.append(item);
  }
  const experiment = document.createElement('div'); experiment.className = 'tutorial-experiment';
  const title = document.createElement('h4'); title.textContent = 'Try it yourself';
  const prompt = document.createElement('p'); prompt.textContent = tutorial.experiment.prompt;
  const details = document.createElement('details'), summary = document.createElement('summary'), hint = document.createElement('p');
  summary.textContent = 'A hint to get you started'; hint.textContent = tutorial.experiment.hint;
  details.append(summary, hint);
  const reminder = document.createElement('p'); reminder.className = 'section-hint';
  reminder.textContent = 'Edits are experiments. The browser checks translation; run Lean to check a changed proof.';
  experiment.append(title, prompt, details, reminder);
  const walkthrough = document.createElement('details'); walkthrough.className = 'tutorial-walkthrough';
  const read = document.createElement('summary'); read.textContent = `Read the tutorial · ${tutorial.steps.length} steps and an experiment`;
  walkthrough.append(read, steps, experiment);
  container.append(eyebrow, heading, introduction, walkthrough);
}
