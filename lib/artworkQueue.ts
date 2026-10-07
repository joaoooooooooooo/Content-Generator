export type ArtworkPriority = 'interactive' | 'background';

/** One capture surface; interactive work goes before queued previews. */
export class ArtworkQueue {
  private jobs: { key: string; priority: ArtworkPriority; run: () => Promise<void> }[] = [];
  private running = false;
  private scheduled = false;

  promote(key: string) {
    const job = this.jobs.find(job => job.key === key);
    if (job) job.priority = 'interactive';
  }

  enqueue<T>(key: string, priority: ArtworkPriority, work: () => Promise<T>): Promise<T> {
    const result = new Promise<T>((resolve, reject) => {
      this.jobs.push({ key, priority, run: async () => {
        try { resolve(await work()); } catch (error) { reject(error); }
      } });
    });
    this.schedule();
    return result;
  }

  private schedule() {
    if (this.running || this.scheduled || !this.jobs.length) return;
    this.scheduled = true;
    // Yield between captures so input can promote the selected template.
    setTimeout(() => { this.scheduled = false; void this.drain(); }, 0);
  }

  private async drain() {
    if (this.running) return;
    const index = this.jobs.findIndex(job => job.priority === 'interactive');
    const job = this.jobs.splice(index < 0 ? 0 : index, 1)[0];
    if (!job) return;
    this.running = true;
    try { await job.run(); } finally { this.running = false; this.schedule(); }
  }
}
