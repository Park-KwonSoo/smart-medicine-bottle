//toDO : Batch System
/**
 * 21/09/14
 * Author : 박권수
 * 배치 시스템
 * 1) 매년 지나면 프로필의 Age를 +1
 * 2) Dosage에 따라, Push Notification 발송
 */

const cron = require('node-cron');

const Profile = require('../models/profile');
const BottleMedicine = require('../models/bottleMedicine');