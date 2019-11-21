import { DatabaseConfigItem } from './DatabaseConfigItem';
import { ConnectionOptions } from 'typeorm';

/**
 * 데이터베이스 연결 구성 환경 변수별
 */
export interface DatabaseConfig {
  // [environment: string]: IDatabaseConfigItem;
  [environment: string]: ConnectionOptions;
}
