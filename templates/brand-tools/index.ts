import { metricTemplates } from './Metric/index';
import { aiVisibilityTemplates } from './AIVisibility/index';
import { listTemplates } from './List/index';
import { featureTemplates } from './Features/index';
import { citationTemplates } from './Citation/index';
export const brandTemplates = [...featureTemplates, ...citationTemplates, ...listTemplates, ...aiVisibilityTemplates, ...metricTemplates];
