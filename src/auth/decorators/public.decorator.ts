import { SetMetadata } from '@nestjs/common';

import { PUBLIC_KEY } from '../auth.constant';

/**
 * set value key public
 */
export const Public = () => SetMetadata(PUBLIC_KEY, true);
