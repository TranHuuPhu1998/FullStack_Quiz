import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import LocalizedFormat from 'dayjs/plugin/localizedFormat';
import timezone from 'dayjs/plugin/timezone';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import relativeTime from 'dayjs/plugin/relativeTime';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';

/**
 * @author anhquoctran
 * @description Commom date and time functions. Built on top of Dayjs.
 * @summary Reference docs: {@link https://day.js.org/docs/en/display/display}
 */
export default (function () {
  const DEFAULT_TIMEZONE = 'Asia/Tokyo';

  dayjs.extend(utc);
  dayjs.extend(LocalizedFormat);
  dayjs.extend(timezone);
  dayjs.extend(isBetween);
  dayjs.extend(isSameOrBefore);
  dayjs.extend(isSameOrAfter);
  dayjs.extend(relativeTime);
  dayjs.extend(advancedFormat);

  dayjs.locale('ja');

  dayjs.tz.setDefault(DEFAULT_TIMEZONE);

  function getCurrentTimezone() {
    return dayjs.tz.guess() || DEFAULT_TIMEZONE;
  }

  return Object.freeze({

    displayedCurrentTimezoneInfo() {
      return `${this.tz}, ${dayjs().offsetName('long')} ${dayjs().offsetName('short')}`
    },

    /**
     * Get current browser's timezone
     */
    tz: getCurrentTimezone(),

    /**
     * Format Unix timestamp date
     * @param unix Unix timestamp value (Total seconds from Jan 1, 1970 00:00:00). Default is current Unix timestamp
     * @param format Specific Dayjs's format to format date. Default is 'YYYY.MM.DD'
     */
    formatUnixDate(unix: number, format: string): string {
      if (!unix || Number.isNaN(unix)) {
        return '';
      }
      return dayjs.unix(unix).tz(getCurrentTimezone()).format(format || 'YYYY.MM.DD');
    },

    /**
     * Format unix time as relative time from now
     * @param unix Unix epoch time
     */
    formatUnixFromNow(unix: number) {
      if (!unix || isNaN(unix)) return '';
      return dayjs(unix).tz(getCurrentTimezone()).toNow();
    },

    /**
     * Parse date time to Dayjs datetime object
     * @param dateInput Input datetime
     */
    parseDateTime(dateInput: string | Date): dayjs.Dayjs {
      return dateInput
        ? dayjs(dateInput).tz(getCurrentTimezone())
        : dayjs().tz(getCurrentTimezone());
    },

    /**
     * Format Unix timestamp value to human readable formatted string
     * @param unix Unix timestamp value (Total seconds from Jan 1, 1970 00:00:00). Default is current Unix timestamp
     * @param format Specific Dayjs's format to format date. Default is 'YYYY.MM.DD A h:mm'
     */
    formatUnixDateHour(unix: number, format: string): string {
      if (!unix) return '';
      return dayjs.unix(unix).utcOffset(getCurrentTimezone()).format(format || 'YYYY.MM.DD A h:mm');
    },

    /**
     * Get current date as string
     * @param format Format of date
     */
    getCurrentDate(format: string): string {
      if (!format) format = 'YYYY.MM.DD';
      return dayjs().tz(getCurrentTimezone()).format(format);
    },

    /**
     * Get current time as string formatted
     * @param format Format of time
     */
    getCurrentTime(format: string): string {
      if (!format) format = 'HH:mm:ss';
      return dayjs().tz(getCurrentTimezone()).format(format);
    },

    /**
     * Parse date input to unix timestampt
     * @param dateInput
     * @param format
     */
    parseDateInputToUnix(
      dateInput: string | Date,
      format: string,
    ): number {
      if (!format) {
        format = 'YYYY/MM/DD';
      }
      dateInput =
        dateInput ?? dayjs().tz(getCurrentTimezone()).format(format);
      return dayjs(dateInput, format).tz(getCurrentTimezone()).unix();
    },

    /**
     * Format a date input to human readable formatted string
     * @param dateInput Date time input to format
     * @param format Specific Dayjs's format to format date. Default is 'YYYY.MM.DD'
     * @return
     */
    formatDate(dateInput: string | Date, format: string): string {
      if (dateInput) {
        return dayjs(dateInput)
          .tz(getCurrentTimezone())
          .format(format);
      }
      return '-';
    },

    /**
     * Set time of date to start of day (00:00:00) or end of day (23:59:59)
     * @param date
     * @param start
     * @returns
     */
    setPointOfDate(date: Date | string, start: boolean): Date {
      if (!date) {
        date = dayjs().tz(getCurrentTimezone()).toDate();
      }

      const dayValue = dayjs(date).tz(getCurrentTimezone());

      return start ? dayValue.startOf('date').toDate() : dayValue.endOf('date').toDate();
    },

    /**
     * Convert date to UNIX timestamp value
     * @param date Input date
     * @returns The UNIX timestamp seconds from 1 Jan 1970
     */
    toUnix(date: Date | string): number {
      if (!date) {
        date = new Date();
      }

      return dayjs(date).tz(getCurrentTimezone()).unix();
    },

    today: dayjs().tz(getCurrentTimezone()).startOf('date').toDate(),

    /**
     * Current date now
     */
    now: dayjs().tz(getCurrentTimezone()).toDate(),

    /**
     * Current date now as UTC (+00:00) time
     */
    nowUTC: dayjs.utc().toDate(),

    /**
     * Current date now as the UNIX timestamp
     */
    nowUnix: dayjs().unix(),

    /**
     * Current Day.js with preconfigured settings (locales, plugins)
     */
    dayjs
  });
})();
