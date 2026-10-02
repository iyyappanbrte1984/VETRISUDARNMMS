import { SchoolRecord, StudentMark } from '../types';

function m(studentName: string, mat: number, satMath: number, satScience: number, satSocial: number): StudentMark {
  return {
    studentName,
    mat,
    satMath,
    satScience,
    satSocial,
    total: mat + satMath + satScience + satSocial
  };
}

type MarkTuple = [string, number, number, number, number];

function rec(sId: string, tId: string, dateStr: string, r1: MarkTuple, r2: MarkTuple, r3: MarkTuple): SchoolRecord {
  return {
    id: `${sId}_${tId}`,
    schoolId: sId,
    testId: tId,
    rank_1: m(r1[0], r1[1], r1[2], r1[3], r1[4]),
    rank_2: m(r2[0], r2[1], r2[2], r2[3], r2[4]),
    rank_3: m(r3[0], r3[1], r3[2], r3[3], r3[4]),
    lastUpdated: dateStr
  };
}

export const REAL_RECORDS: SchoolRecord[] = [
  // S1: PUMS, ANNA NAGAR (33080300101)
  rec('S1', 'test_1', '2026-06-25', ['Sathypriya', 50, 7, 15, 19], ['Sivambika', 50, 7, 14, 19], ['Inbarasan', 48, 7, 15, 19]),
  rec('S1', 'test_2', '2026-07-02', ['Sathipriya', 49, 10, 18, 20], ['Sivambika', 49, 9, 19, 19], ['Inbarasan', 45, 8, 18, 17]),
  rec('S1', 'test_3', '2026-07-09', ['Sathipriya', 43, 9, 17, 18], ['Sivambika', 50, 6, 20, 16], ['Inbarasan', 45, 10, 16, 20]),
  rec('S1', 'test_4', '2026-07-16', ['Sathipriya', 43, 10, 18, 17], ['Sivambika', 46, 10, 17, 9], ['Dhivyadharshini', 34, 6, 18, 20]),
  rec('S1', 'test_5', '2026-07-23', ['Sivambika B', 41, 8, 17, 10], ['Sathipriya R', 34, 6, 8, 15], ['Dhivyadharshini V', 30, 3, 14, 14]),
  rec('S1', 'test_6', '2026-07-30', ['Sathiyapriya', 45, 10, 16, 16], ['sivambiga', 37, 10, 18, 17], ['Dhivyadharshini', 44, 10, 14, 13]),

  // S2: PUMS, DANISHPET (33080300601)
  rec('S2', 'test_1', '2026-06-25', ['Lokeswari', 32, 7, 12, 14], ['Magibalan', 28, 7, 11, 12], ['Deepthi', 25, 6, 10, 14]),
  rec('S2', 'test_2', '2026-07-02', ['Deepthi', 40, 5, 12, 11], ['Lokeswari', 38, 4, 9, 11], ['Rithanya', 35, 4, 8, 8]),
  rec('S2', 'test_3', '2026-07-09', ['Magubalan', 40, 7, 9, 12], ['Deepthi', 40, 6, 8, 10], ['Aswwinraj', 39, 7, 8, 7]),
  rec('S2', 'test_4', '2026-07-16', ['Lokeswari', 45, 7, 12, 13], ['Deepthi', 43, 7, 9, 9], ['Magibalan', 40, 5, 9, 11]),
  rec('S2', 'test_5', '2026-07-23', ['Maghebalan G', 30, 2, 12, 14], ['Jayaprakash K', 26, 4, 14, 10], ['Rithanya A', 22, 4, 4, 11]),
  rec('S2', 'test_6', '2026-07-30', ['Lokeswari', 39, 8, 18, 17], ['Rithanya', 36, 8, 15, 13], ['Magibalan', 36, 7, 12, 11]),

  // S3: PUMS, DASASAMUTHIRAM (33080301901)
  rec('S3', 'test_1', '2026-06-25', ['Mounika', 30, 6, 14, 15], ['Subasri', 28, 5, 13, 13], ['Sabari', 23, 5, 11, 12]),
  rec('S3', 'test_2', '2026-07-02', ['Vimal', 25, 6, 14, 10], ['Subasri', 24, 5, 12, 13], ['Rithish', 23, 5, 10, 12]),
  rec('S3', 'test_3', '2026-07-09', ['Subasri', 37, 8, 12, 13], ['Mounika', 34, 6, 10, 11], ['Sabarimani', 30, 5, 9, 8]),
  rec('S3', 'test_4', '2026-07-16', ['Subasri', 42, 10, 13, 18], ['Sabarimani', 32, 7, 12, 12], ['Pradeep', 25, 5, 10, 10]),
  rec('S3', 'test_5', '2026-07-23', ['Mounika', 30, 5, 10, 10], ['Subha Sri', 29, 3, 11, 10], ['Pavithravanan', 26, 4, 10, 10]),
  rec('S3', 'test_6', '2026-07-30', ['mounika', 32, 6, 13, 14], ['subhasri', 30, 5, 12, 13], ['Inbavanan', 30, 4, 10, 13]),

  // S4: PUMS, ELATHUR (33080301101)
  rec('S4', 'test_1', '2026-06-25', ['Keerthana', 50, 9, 19, 18], ['Sitheswaran', 49, 9, 19, 18], ['Mothika', 42, 8, 17, 17]),
  rec('S4', 'test_2', '2026-07-02', ['Mothika', 47, 9, 15, 15], ['Dhivya', 43, 9, 14, 15], ['Sitheswaran', 47, 9, 14, 13]),
  rec('S4', 'test_3', '2026-07-09', ['Sitheswaran', 34, 8, 14, 11], ['Dhivya', 26, 7, 12, 12], ['Mothika', 25, 8, 11, 10]),
  rec('S4', 'test_4', '2026-07-16', ['Dhivya', 41, 4, 10, 14], ['Siddehwaran', 42, 4, 6, 12], ['Keerthana', 38, 2, 6, 14]),
  rec('S4', 'test_5', '2026-07-23', ['V Sitheswaran', 39, 6, 14, 9], ['R Suryarajendiran', 39, 3, 10, 8], ['P Mothika', 27, 5, 14, 10]),
  rec('S4', 'test_6', '2026-07-30', ['V SITHESWARAN', 27, 4, 11, 6], ['K DIVYA', 26, 1, 7, 6], ['V KEERTHANA', 19, 2, 7, 7]),

  // S5: PUMS, GURUVAREDDIYUR (33080301205)
  rec('S5', 'test_1', '2026-06-25', ['Thenisha', 43, 8, 17, 17], ['Poomozhi Yazhini', 39, 5, 16, 9], ['Devika', 35, 5, 13, 9]),
  rec('S5', 'test_2', '2026-07-02', ['Poomozhi Yazhini', 44, 4, 11, 8], ['Brintha Sri', 32, 4, 10, 6], ['Agalya', 34, 3, 7, 8]),
  rec('S5', 'test_3', '2026-07-09', ['Brintha Sri', 24, 8, 16, 13], ['Poomozhi Yazhini', 28, 5, 12, 15], ['Deepakrishi', 20, 4, 10, 9]),
  rec('S5', 'test_4', '2026-07-16', ['Poomozhi Yazhini', 39, 7, 16, 15], ['Brintha Sri', 29, 6, 10, 10], ['Thenisha', 32, 6, 9, 11]),
  rec('S5', 'test_5', '2026-07-23', ['Poomozhi Yazhini', 34, 8, 9, 10], ['Thenisha', 23, 4, 9, 8], ['Agalya', 22, 3, 7, 6]),
  rec('S5', 'test_6', '2026-07-30', ['poomozhi yazhini', 40, 3, 11, 14], ['devika', 22, 4, 10, 10], ['brinda sri', 24, 3, 12, 9]),

  // S6: PUMS, K N PUDUR (33080300308)
  rec('S6', 'test_1', '2026-06-25', ['Gayathiri', 30, 8, 9, 7], ['Devaraj', 29, 9, 8, 6], ['Aswini', 27, 7, 9, 8]),
  rec('S6', 'test_2', '2026-07-02', ['Keerthi', 37, 9, 11, 13], ['Latchitha', 38, 8, 12, 11], ['Muthulakshmi', 38, 9, 14, 8]),
  rec('S6', 'test_3', '2026-07-09', ['Muthulakshmi', 35, 8, 12, 10], ['Priyadharshini', 37, 7, 10, 13], ['Latchitha', 34, 8, 7, 10]),
  rec('S6', 'test_4', '2026-07-16', ['Jansirani', 40, 7, 12, 8], ['Kavipriya', 43, 6, 7, 10], ['Latchitha', 40, 7, 11, 7]),
  rec('S6', 'test_5', '2026-07-23', ['A B Sadhana', 16, 3, 9, 6], ['M Sabila', 13, 2, 8, 7], ['S Haritha', 11, 4, 11, 3]),
  rec('S6', 'test_6', '2026-07-30', ['DEVARAJ', 24, 8, 14, 11], ['MUTHULAKSHMI', 23, 7, 8, 14], ['LATCHITHA', 24, 6, 10, 10]),

  // S7: PUMS, KADAYAMPATTI (33080301001)
  rec('S7', 'test_1', '2026-06-25', ['Pavithra', 35, 7, 17, 15], ['Monisha', 34, 6, 14, 13], ['Vetrivel', 31, 6, 12, 13]),
  rec('S7', 'test_2', '2026-07-02', ['Pavitra', 36, 7, 12, 12], ['Monisha', 32, 6, 11, 11], ['Vetrivel', 29, 6, 11, 11]),
  rec('S7', 'test_3', '2026-07-09', ['Pavitra', 31, 7, 15, 13], ['Monisha', 30, 7, 11, 12], ['Vetrivel', 28, 6, 11, 11]),
  rec('S7', 'test_4', '2026-07-16', ['Pavitra', 32, 7, 12, 13], ['Monisha', 31, 6, 11, 12], ['Vetrivel', 27, 5, 11, 11]),
  rec('S7', 'test_5', '2026-07-23', ['Monisha', 31, 7, 15, 15], ['Pavithra', 28, 6, 12, 14], ['Kanishka', 26, 6, 11, 13]),
  rec('S7', 'test_6', '2026-07-30', ['PAVITHRA', 25, 7, 7, 8], ['MONISHA', 24, 6, 7, 7], ['VETRIVEL', 21, 6, 6, 6]),

  // S8: PUMS, KANNAPADI (33080300402)
  rec('S8', 'test_1', '2026-06-25', ['Jeyakumar', 21, 7, 13, 17], ['Srikanth', 18, 6, 11, 14], ['Naveenkumar', 14, 8, 12, 13]),
  rec('S8', 'test_2', '2026-07-02', ['Naveenkumar', 18, 5, 10, 8], ['Srikanth', 18, 5, 12, 10], ['Jeyakumar', 18, 8, 10, 9]),
  rec('S8', 'test_3', '2026-07-09', ['Jeyakumar', 17, 7, 15, 12], ['Naveenkumar', 18, 7, 7, 12], ['Balachandran', 14, 7, 12, 11]),
  rec('S8', 'test_4', '2026-07-16', ['Jeyakumar', 22, 7, 13, 11], ['Naveenkumar', 21, 7, 10, 11], ['Srikanth', 21, 7, 11, 9]),
  rec('S8', 'test_5', '2026-07-23', ['B Moulika', 19, 7, 9, 3], ['R Vinoth', 15, 4, 7, 9], ['R Balachandran', 16, 8, 5, 5]),
  rec('S8', 'test_6', '2026-07-30', ['JEYAKUMAR', 15, 3, 7, 9], ['SRIKANTH', 18, 2, 7, 12], ['MOULIKA', 21, 3, 4, 8]),

  // S9: PUMS, KARUVALLI (33080301503)
  rec('S9', 'test_1', '2026-06-25', ['Kiruthika S', 48, 10, 20, 17], ['Aarthi M', 36, 9, 18, 17], ['Haripritha J', 36, 7, 17, 16]),
  rec('S9', 'test_2', '2026-07-02', ['Kiruthika S', 35, 3, 10, 13], ['Rithikssri M', 37, 2, 8, 8], ['Aarthi M', 31, 3, 9, 11]),
  rec('S9', 'test_3', '2026-07-09', ['Rithiksri M', 29, 7, 12, 12], ['Kiruthika S', 28, 6, 10, 14], ['Aarthi M', 23, 6, 10, 11]),
  rec('S9', 'test_4', '2026-07-16', ['Haripritha J', 38, 5, 10, 15], ['Brundha S', 39, 4, 10, 13], ['Kiruthika S', 36, 5, 10, 13]),
  rec('S9', 'test_5', '2026-07-23', ['Haripritha', 27, 5, 12, 10], ['Aarthi', 27, 5, 11, 10], ['Kiruthika', 25, 5, 11, 10]),
  rec('S9', 'test_6', '2026-07-30', ['Kanishkadevi N', 25, 6, 9, 10], ['Rithikasri M', 23, 3, 9, 12], ['Kiruthika S', 24, 4, 8, 10]),

  // S10: PUMS, KOTTAMEDU NEW SCHOOL (33080302301)
  rec('S10', 'test_1', '2026-06-25', ['Sriraj R', 35, 3, 12, 5], ['Bhuvaneswari C', 32, 2, 8, 3], ['Mohammed Athaullah', 30, 2, 10, 7]),
  rec('S10', 'test_2', '2026-07-02', ['Sriraj', 40, 3, 10, 12], ['Kaviya', 38, 4, 14, 10], ['Mohammed Athaullah', 35, 3, 12, 12]),
  rec('S10', 'test_3', '2026-07-09', ['Kaviya', 37, 3, 9, 11], ['Dhanasri', 36, 4, 9, 7], ['Pradip', 35, 3, 7, 5]),
  rec('S10', 'test_4', '2026-07-16', ['Sriraj', 45, 4, 12, 10], ['Yesvanth', 44, 3, 8, 9], ['Mohammad Athaullah', 42, 3, 10, 7]),
  rec('S10', 'test_5', '2026-07-23', ['V Thirukumaran', 22, 8, 11, 20], ['R Ramayasree', 30, 8, 11, 9], ['S Venishka', 24, 7, 11, 8]),
  rec('S10', 'test_6', '2026-07-30', ['R.SRIRAJ', 33, 8, 8, 7], ['C.BHUVANESWARI', 32, 3, 7, 7], ['G KAVIYA', 32, 3, 7, 7]),

  // S11: PUMS, MARAKOTTAI (33080301504)
  rec('S11', 'test_1', '2026-06-25', ['Navyasri', 36, 7, 16, 16], ['Dhakshinya', 34, 6, 17, 20], ['Vasudevan', 35, 4, 15, 17]),
  rec('S11', 'test_2', '2026-07-02', ['Navyasri', 36, 4, 16, 17], ['Dhakshinya', 31, 4, 16, 17], ['Vasudevan', 44, 9, 12, 10]),
  rec('S11', 'test_3', '2026-07-09', ['Navyasri', 50, 10, 16, 16], ['Dhakshinya', 21, 9, 11, 11], ['Vasudevan', 25, 1, 8, 8]),
  rec('S11', 'test_4', '2026-07-16', ['Navyasri', 41, 7, 10, 10], ['Dhakshinya', 41, 7, 10, 9], ['Vasudevan', 37, 5, 7, 11]),
  rec('S11', 'test_5', '2026-07-23', ['T Dhakshinya', 38, 4, 10, 9], ['M Navya Sri', 26, 6, 14, 9], ['R Vasudevan', 24, 6, 12, 9]),
  rec('S11', 'test_6', '2026-07-30', ['Navyasri', 23, 2, 2, 12], ['Ajay', 27, 3, 3, 10], ['Dhakshinya', 24, 5, 5, 15]),

  // S12: PUMS, MATTUKKARANPUDUR (33080302103)
  rec('S12', 'test_1', '2026-06-25', ['M Jayaprakash', 18, 4, 7, 6], ['S Vishnu', 17, 4, 8, 8], ['R Srinithi', 16, 2, 9, 8]),
  rec('S12', 'test_2', '2026-07-02', ['N Mounishwar', 29, 3, 9, 8], ['G Ohm Prakash', 27, 2, 3, 8], ['S Eniya', 27, 3, 8, 5]),
  rec('S12', 'test_3', '2026-07-09', ['N Mounishwar', 23, 5, 4, 8], ['M Jayaprakash', 22, 6, 3, 8], ['S Eniya', 21, 2, 7, 5]),
  rec('S12', 'test_4', '2026-07-16', ['N Mounishwar', 25, 7, 8, 8], ['M Jayaprakash', 24, 6, 9, 9], ['S Eniya', 23, 6, 8, 8]),
  rec('S12', 'test_5', '2026-07-23', ['S Eniya', 20, 2, 8, 6], ['N Mounishwaran', 22, 5, 5, 3], ['R Shivanisri', 18, 3, 8, 5]),
  rec('S12', 'test_6', '2026-07-30', ['R.Srinithi', 28, 6, 6, 8], ['N.Mounishwwaran', 28, 7, 7, 5], ['S.Vishnu', 24, 4, 5, 11]),

  // S13: PUMS, NALLUR (33080301305)
  rec('S13', 'test_1', '2026-06-25', ['A B Sadhana', 21, 4, 1, 4], ['M Srithiksha', 17, 3, 4, 6], ['M Priyadarsini', 13, 3, 9, 4]),
  rec('S13', 'test_2', '2026-07-02', ['A B Sathana', 20, 1, 11, 5], ['P Vaishnavi', 19, 3, 8, 6], ['S Haritha', 19, 3, 8, 6]),
  rec('S13', 'test_3', '2026-07-09', ['A B Sathana', 20, 5, 5, 10], ['M Priyadarsini', 19, 6, 5, 8], ['S Haritha', 15, 4, 9, 7]),
  rec('S13', 'test_4', '2026-07-16', ['S Haritha', 30, 3, 2, 6], ['M Sabila', 28, 2, 4, 4], ['A B Sathana', 26, 2, 5, 5]),
  rec('S13', 'test_5', '2026-07-23', ['C Bhuvaneshwari', 25, 3, 11, 9], ['G Kaviya', 25, 3, 11, 9], ['P Dhanasri', 25, 3, 9, 11]),
  rec('S13', 'test_6', '2026-07-30', ['S. HARITHA', 14, 4, 11, 10], ['M. PRIYADHARSINI', 15, 2, 9, 9], ['E. POOVARASAN', 15, 4, 9, 7]),

  // S14: PUMS, NALLUR MANIYAKARANOOR (33080301403)
  rec('S14', 'test_1', '2026-06-25', ['M Harish', 33, 5, 12, 13], ['A Naveen Prabhu', 34, 5, 10, 12], ['S Dejas', 33, 4, 7, 10]),
  rec('S14', 'test_2', '2026-07-02', ['A Naveen Prabhu', 49, 7, 8, 13], ['M Harish', 37, 6, 10, 11], ['S Dejas', 43, 4, 6, 8]),
  rec('S14', 'test_3', '2026-07-09', ['S Dejas', 32, 8, 13, 11], ['A Naveen Prabhu', 30, 7, 12, 12], ['M Harish', 28, 7, 15, 11]),
  rec('S14', 'test_4', '2026-07-16', ['M Harish', 44, 5, 12, 13], ['A Naveen Prabhu', 47, 5, 8, 12], ['P Sajeetha', 42, 5, 8, 9]),
  rec('S14', 'test_5', '2026-07-23', ['M Harish', 27, 4, 15, 10], ['S Tejas', 25, 4, 8, 9], ['C Monisha', 17, 5, 11, 13]),
  rec('S14', 'test_6', '2026-07-30', ['A NAVEEN PRABHU', 30, 3, 11, 12], ['M. HARISH', 23, 1, 13, 16], ['C. TEJAS', 25, 5, 11, 11]),

  // S15: PUMS, PAPPICHETTIPATTI (33080302306)
  rec('S15', 'test_1', '2026-06-25', ['R Dharshini', 27, 3, 10, 8], ['S Vigneswaran', 23, 2, 12, 8], ['M Mohith', 24, 2, 8, 5]),
  rec('S15', 'test_2', '2026-07-02', ['R Dharshini', 29, 5, 12, 6], ['S Vigneswaran', 16, 4, 13, 12], ['M Mohith', 24, 4, 7, 10]),
  rec('S15', 'test_3', '2026-07-09', ['P Rubitha', 20, 6, 6, 10], ['S Pothuraj', 21, 4, 8, 8], ['M Mohith', 22, 6, 4, 8]),
  rec('S15', 'test_4', '2026-07-16', ['R Dharshini', 41, 4, 9, 6], ['M Mohith', 40, 5, 6, 4], ['A Srikaran', 38, 1, 6, 8]),
  rec('S15', 'test_5', '2026-07-23', ['R Dharshini', 37, 4, 12, 8], ['P Rubitha', 33, 5, 11, 7], ['M Mohith', 40, 5, 6, 4]),
  rec('S15', 'test_6', '2026-07-30', ['M.MOHITH', 37, 2, 7, 6], ['R.DHARSHINI', 25, 5, 12, 10], ['A.SRIKARAN', 26, 1, 8, 5]),

  // S16: PUMS, POOSARIPATTI (33080301802)
  rec('S16', 'test_1', '2026-06-25', ['Thirukumaran V', 18, 5, 4, 6], ['R Ramyasri', 14, 4, 4, 6], ['S Venishka', 18, 3, 5, 5]),
  rec('S16', 'test_2', '2026-07-02', ['Thirukumaran V', 18, 6, 4, 7], ['R Ramyasri', 23, 3, 5, 5], ['Magalakshmi M', 18, 2, 4, 7]),
  rec('S16', 'test_3', '2026-07-09', ['Thirukumaran V', 19, 6, 6, 6], ['R Ramyasri', 18, 5, 7, 6], ['Nikitha Sri S', 17, 5, 5, 6]),
  rec('S16', 'test_4', '2026-07-16', ['Thirukumaran V', 19, 6, 6, 5], ['R Ramyasri', 18, 5, 5, 5], ['Nikitha Sri S', 18, 4, 5, 6]),
  rec('S16', 'test_5', '2026-07-23', ['Thirukumaran V', 22, 6, 8, 8], ['R Ramyasri', 20, 5, 7, 7], ['Nikitha Sri S', 21, 4, 6, 7]),
  rec('S16', 'test_6', '2026-07-30', ['R.RAMYA SRI', 29, 6, 7, 7], ['K YOGA DHARSHINI', 25, 7, 5, 5], ['V THIRUKUMARAN', 20, 7, 5, 8]),

  // S17: PUMS, PUDURKARUVALLI (33080301501)
  rec('S17', 'test_1', '2026-06-25', ['V Sivani', 25, 3, 12, 15], ['Jayakumar', 20, 4, 11, 10], ['Ukesh', 23, 3, 10, 9]),
  rec('S17', 'test_2', '2026-07-02', ['V Sivani', 39, 7, 8, 7], ['Udayashankar', 30, 2, 9, 7], ['Jayakumar', 27, 1, 9, 7]),
  rec('S17', 'test_3', '2026-07-09', ['V Sivani', 35, 7, 11, 12], ['Udayashankar', 17, 2, 14, 13], ['Jayakumar', 16, 3, 10, 10]),
  rec('S17', 'test_4', '2026-07-16', ['V Sivani', 38, 5, 7, 11], ['Jayakumar', 33, 3, 8, 15], ['Siva Ranjani', 40, 3, 5, 9]),
  rec('S17', 'test_5', '2026-07-23', ['V Shivani', 30, 3, 11, 11], ['K Sivaranjani', 27, 2, 7, 8], ['A Jayakumar', 17, 3, 6, 8]),
  rec('S17', 'test_6', '2026-07-30', ['V.SIVANI', 31, 6, 12, 8], ['R.Udhaya shankar', 20, 2, 9, 5], ['K.SIVARANJANI', 18, 4, 7, 6]),

  // S18: PUMS, SEMMANDAPATTI (33080302401)
  rec('S18', 'test_1', '2026-06-25', ['T Swasthiga S', 28, 4, 13, 9], ['V Sharanya', 22, 2, 12, 11], ['P Jenisha', 22, 2, 11, 12]),
  rec('S18', 'test_2', '2026-07-02', ['T Swasthikasri', 46, 9, 18, 19], ['V Sharanya', 44, 9, 16, 18], ['P Jenisha', 43, 9, 18, 16]),
  rec('S18', 'test_3', '2026-07-09', ['T Swasthikasri', 23, 7, 9, 10], ['V Dharshana', 20, 8, 7, 12], ['G Janani', 17, 10, 9, 11]),
  rec('S18', 'test_4', '2026-07-16', ['V Nithish Bharathi', 34, 2, 10, 8], ['T Swasthikasri', 37, 2, 7, 8], ['S Kishore', 34, 2, 7, 5]),
  rec('S18', 'test_5', '2026-07-23', ['V Dharshana', 30, 8, 13, 18], ['T Swasthikasri', 34, 4, 6, 14], ['S Akshaya', 30, 7, 7, 12]),
  rec('S18', 'test_6', '2026-07-30', ['V. DHARSHANA', 33, 8, 13, 14], ['T. SWASTHIKASRI', 25, 8, 15, 17], ['P. NISHALINI', 25, 7, 13, 15]),

  // S19: PUMS, SUNDAKAPATTI (33080300803)
  rec('S19', 'test_1', '2026-06-25', ['S Selvam', 24, 4, 5, 4], ['M Immanvel', 22, 5, 12, 13], ['S Vinothini', 23, 5, 10, 12]),
  rec('S19', 'test_2', '2026-07-02', ['S Selvam', 23, 7, 8, 7], ['M Immanvel', 28, 2, 9, 7], ['S Vinothini', 26, 1, 9, 7]),
  rec('S19', 'test_3', '2026-07-09', ['S Selvam', 19, 5, 7, 6], ['M Immanvel', 21, 5, 5, 6], ['S Vinothini', 23, 7, 11, 12]),
  rec('S19', 'test_4', '2026-07-16', ['S Selvam', 25, 3, 5, 9], ['M Immanvel', 26, 2, 10, 8], ['S Vinothini', 31, 2, 7, 8]),
  rec('S19', 'test_5', '2026-07-23', ['M Immanuvel', 30, 8, 13, 18], ['S Selvam', 29, 4, 6, 14], ['Janani S', 28, 6, 5, 10]),
  rec('S19', 'test_6', '2026-07-30', ['S.Vinothini', 35, 8, 12, 14], ['S.Selvam', 25, 7, 11, 13], ['M.Immavuvel', 25, 8, 13, 12]),

  // S20: PUMS, THALAVAIPATTI (33080301102)
  rec('S20', 'test_1', '2026-06-25', ['Navadharshna', 35, 8, 17, 19], ['Boobesh', 33, 8, 15, 16], ['Dharun', 34, 7, 12, 9]),
  rec('S20', 'test_2', '2026-07-02', ['Boobesh', 45, 9, 13, 15], ['Navadharshna', 33, 7, 15, 15], ['Kanishka', 44, 5, 11, 10]),
  rec('S20', 'test_3', '2026-07-09', ['Boobesh', 34, 7, 19, 16], ['Kanishka', 31, 7, 12, 11], ['Rithika', 31, 6, 9, 13]),
  rec('S20', 'test_4', '2026-07-16', ['Boobesh', 47, 7, 14, 13], ['Kanishka', 41, 4, 7, 14], ['Mathiyalagan', 32, 8, 10, 12]),
  rec('S20', 'test_5', '2026-07-23', ['M Boobesh', 38, 7, 14, 17], ['S Kanishka', 26, 4, 11, 7], ['D Dharun', 22, 6, 5, 12]),
  rec('S20', 'test_6', '2026-07-30', ['kanishka', 34, 4, 15, 14], ['Boobesh', 35, 5, 11, 14], ['Navadharshna', 33, 4, 11, 11]),

  // S21: PUMS, THINNAPATTI (33080302102)
  rec('S21', 'test_1', '2026-06-25', ['Swathi', 34, 6, 15, 15], ['Sri Chaitanya', 32, 6, 14, 13], ['Magisha Sri', 26, 7, 12, 13]),
  rec('S21', 'test_2', '2026-07-02', ['Magisha Sri', 46, 10, 19, 20], ['Sri Chaitanya', 46, 10, 19, 18], ['Dhanya Sri', 46, 10, 19, 18]),
  rec('S21', 'test_3', '2026-07-09', ['Dhanya Sri', 21, 9, 16, 19], ['Swathi', 18, 9, 15, 19], ['Magisha Sri', 17, 4, 10, 5]),
  rec('S21', 'test_4', '2026-07-16', ['Swathi', 37, 10, 18, 18], ['Magisha Sri', 37, 10, 18, 18], ['Sadhana', 37, 10, 18, 18]),
  rec('S21', 'test_5', '2026-07-23', ['S Swathi', 21, 4, 8, 9], ['Sadhana', 21, 4, 8, 9], ['Magisha Sri', 21, 4, 8, 9]),
  rec('S21', 'test_6', '2026-07-30', ['S.Swathi', 26, 3, 8, 11], ['S.Dhanya sri', 24, 4, 6, 11], ['T.Magisha sri', 25, 4, 6, 10]),

  // S22: PUMS, UMBILICKAMPATTI (33080300703)
  rec('S22', 'test_1', '2026-06-25', ['M Mohanbabu', 20, 7, 6, 10], ['A Subasri', 15, 3, 6, 10], ['S Datashaya', 14, 2, 7, 8]),
  rec('S22', 'test_2', '2026-07-02', ['M Mohanbabu', 33, 4, 10, 10], ['A Subasri', 45, 2, 7, 12], ['S Datashaya', 34, 1, 9, 6]),
  rec('S22', 'test_3', '2026-07-09', ['M Mohanbabu', 16, 3, 7, 10], ['A Subasri', 18, 2, 8, 10], ['S Datashaya', 13, 2, 8, 11]),
  rec('S22', 'test_4', '2026-07-16', ['M Mohanbabu', 32, 4, 6, 11], ['A Subasri', 30, 6, 4, 10], ['S Datashaya', 33, 4, 3, 8]),
  rec('S22', 'test_5', '2026-07-23', ['M Mohanbabu', 21, 7, 5, 8], ['A Subasri', 23, 4, 4, 3], ['S Datasha', 20, 2, 7, 5]),
  rec('S22', 'test_6', '2026-07-30', ['A.Subasri', 18, 3, 11, 15], ['S.Ammu', 19, 1, 7, 9], ['S.Datshaya', 17, 2, 6, 8]),

  // S23: PUMS, V KONGARAPATTI (33080300208)
  rec('S23', 'test_1', '2026-06-25', ['B Tharun', 25, 4, 13, 11], ['R Kanishka', 24, 4, 9, 9], ['K Varnisha', 23, 3, 12, 12]),
  rec('S23', 'test_2', '2026-07-02', ['B Tharun', 30, 6, 16, 10], ['R Kanishka', 25, 6, 17, 12], ['K Varnisha', 29, 6, 16, 11]),
  rec('S23', 'test_3', '2026-07-09', ['K Varnisha', 17, 8, 5, 10], ['R Kanishka', 14, 8, 6, 10], ['B Tharun', 15, 9, 4, 6]),
  rec('S23', 'test_4', '2026-07-16', ['B Tharun', 35, 4, 8, 3], ['R Kanishka', 37, 3, 1, 4], ['K Varnisha', 34, 3, 2, 5]),
  rec('S23', 'test_5', '2026-07-23', ['B Tharun', 27, 3, 5, 4], ['R Kanishka', 23, 2, 10, 8], ['K Varnisha', 28, 3, 8, 10]),
  rec('S23', 'test_6', '2026-07-30', ['R.kanishka', 37, 9, 18, 18], ['K.varnisha', 24, 7, 11, 11], ['B.Tharun', 18, 2, 7, 5]),

  // S24: PUMS, VEERATCHIYUR (33080300305)
  rec('S24', 'test_1', '2026-06-25', ['A Jeeva', 23, 6, 9, 10], ['D Vinothkumar', 20, 7, 11, 9], ['M Malathi', 25, 6, 10, 9]),
  rec('S24', 'test_2', '2026-07-02', ['A Jeeva', 26, 6, 12, 13], ['D Vinothkumar', 29, 7, 10, 9], ['M Malathi', 24, 6, 13, 11]),
  rec('S24', 'test_3', '2026-07-09', ['A Jeeva', 23, 6, 12, 8], ['D Vinothkumar', 25, 8, 13, 6], ['M Malathi', 27, 7, 9, 10]),
  rec('S24', 'test_4', '2026-07-16', ['A Jeeva', 22, 5, 9, 11], ['D Vinothkumar', 19, 6, 8, 9], ['M Malathi', 15, 6, 9, 10]),
  rec('S24', 'test_5', '2026-07-23', ['A Jeeva', 21, 5, 6, 10], ['D Vinothkumar', 25, 4, 9, 9], ['M Malathi', 22, 5, 8, 8]),
  rec('S24', 'test_6', '2026-07-30', ['A.Jeeva', 22, 6, 11, 9], ['D.Vinothkumar', 24, 7, 12, 11], ['M.Malathi', 19, 6, 10, 7]),

  // S25: PUMS, VEERIYANTHANDA (33080300204)
  rec('S25', 'test_1', '2026-06-25', ['Boomika', 21, 1, 10, 13], ['Preethikasri', 20, 1, 10, 11], ['Keerthika', 20, 1, 6, 11]),
  rec('S25', 'test_2', '2026-07-02', ['Boomika', 25, 1, 16, 9], ['Preethikasri', 24, 1, 15, 9], ['Keerthika', 22, 1, 14, 9]),
  rec('S25', 'test_3', '2026-07-09', ['Preethikasri', 19, 1, 8, 6], ['Boomika', 19, 1, 4, 6], ['Keerthika', 19, 1, 4, 6]),
  rec('S25', 'test_4', '2026-07-16', ['Preethikasri', 45, 5, 12, 10], ['Boomika', 43, 5, 9, 7], ['Keerthika', 37, 3, 10, 8]),
  rec('S25', 'test_5', '2026-07-23', ['S Prithika Sri', 44, 9, 18, 17], ['Boomika', 41, 9, 17, 14], ['Keerthika', 38, 8, 15, 12]),
  rec('S25', 'test_6', '2026-07-30', ['preethikasri', 31, 5, 13, 12], ['Boomika', 26, 5, 11, 10], ['Keerthika', 25, 5, 6, 9]),

  // S26: K.G.B.V KADAYAMPATTI (33080300405)
  rec('S26', 'test_1', '2026-06-25', ['C Mahalakshmi', 27, 4, 4, 5], ['C Nandhini', 15, 2, 11, 8], ['S Mahalakshmi', 18, 3, 7, 5]),
  rec('S26', 'test_2', '2026-07-02', ['M Amsaveni', 38, 6, 8, 6], ['S Mahalakshmi', 26, 5, 7, 8], ['R Preethika', 32, 3, 4, 4]),
  rec('S26', 'test_3', '2026-07-09', ['C Nandhini', 27, 4, 8, 8], ['R Dhanushiya', 24, 3, 9, 9], ['K Sanjana', 23, 4, 4, 13]),
  rec('S26', 'test_4', '2026-07-16', ['R Rithika', 31, 4, 9, 9], ['V Dhivashini', 34, 2, 6, 6], ['S Mahalakshmi', 35, 2, 3, 8]),
  rec('S26', 'test_5', '2026-07-23', ['M Amsaveni', 23, 2, 9, 6], ['R Preethika', 23, 1, 7, 9], ['S Mahalakshmi', 22, 4, 3, 6]),
  rec('S26', 'test_6', '2026-07-30', ['S.Mahalakshmi', 24, 5, 5, 6], ['M.Amsaveni', 24, 3, 6, 5], ['S.Nisha', 21, 2, 7, 6]),
  // S1 Tests 7 to 12
  rec('S1', 'test_7', '2026-08-07', ['B. Sivambiga', 22, 8, 9, 8], ['R. Sathiyapriya', 19, 5, 8, 9], ['R. Inbarasan', 16, 5, 9, 9]),
  rec('S1', 'test_8', '2026-08-14', ['B. Sivambiga', 31, 7, 8, 11], ['R. Inbarasan', 26, 9, 8, 12], ['V. Dhivyadharshini', 24, 9, 9, 11]),
  rec('S1', 'test_9', '2026-08-21', ['R. Sathiyapriya', 19, 6, 15, 7], ['R. Inbarasan', 19, 6, 11, 10], ['B. Sivambika', 19, 6, 9, 10]),
  rec('S1', 'test_10', '2026-08-28', ['B. Sivambiga', 45, 9, 19, 15], ['R. Inbarasan', 38, 5, 12, 16], ['R. Sathiyapriya', 31, 5, 14, 13]),
  rec('S1', 'test_11', '2026-09-03', ['B. Sivambiga', 20, 8, 7, 16], ['R. Sathiyapriya', 7, 5, 19, 16], ['K. Kavinesh', 22, 5, 4, 13]),
  rec('S1', 'test_12', '2026-09-15', ['R. Sathiyapriya', 32, 6, 12, 13], ['R. Inbarasan', 35, 8, 8, 9], ['B. Sivambiga', 30, 6, 10, 11]),

  // S2 Tests 7 to 12
  rec('S2', 'test_7', '2026-08-07', ['Deepthi', 28, 3, 9, 10], ['Maghebalan', 23, 5, 9, 8], ['Kanishkasri', 21, 4, 7, 6]),
  rec('S2', 'test_8', '2026-08-14', ['Lokeshwari', 28, 5, 11, 8], ['Deepthi', 22, 3, 9, 9], ['Kanishkasri', 20, 4, 7, 6]),
  rec('S2', 'test_9', '2026-08-21', ['Lokeshwari', 41, 8, 16, 17], ['Kanishkasri', 40, 8, 14, 14], ['Deepthi', 40, 7, 16, 17]),
  rec('S2', 'test_10', '2026-08-28', ['Deepthi', 28, 6, 11, 12], ['Lokeshwari', 25, 7, 9, 12], ['Jayaprakash', 22, 5, 11, 11]),
  rec('S2', 'test_11', '2026-09-03', ['Maghebalan', 29, 5, 11, 9], ['Jayaprakash', 22, 3, 12, 8], ['Vithya', 21, 5, 8, 9]),
  rec('S2', 'test_12', '2026-09-15', ['Lokeshwari', 26, 5, 12, 13], ['Deepthi', 24, 5, 11, 11], ['Maghebalan', 24, 4, 10, 11]),

  // S3 Tests 7 to 12
  rec('S3', 'test_7', '2026-08-07', ['R. Mounika', 40, 7, 8, 13], ['R. Subhasri', 30, 7, 15, 10], ['P. Rithish', 20, 6, 9, 7]),
  rec('S3', 'test_8', '2026-08-14', ['R. Subhasri', 32, 5, 13, 10], ['R. Mounika', 26, 5, 10, 13], ['P. Dhanya Sri', 26, 8, 8, 7]),
  rec('S3', 'test_9', '2026-08-21', ['R. Subha Sri', 28, 7, 11, 13], ['P. Dhanya Sri', 28, 5, 7, 7], ['K. Varshini', 22, 4, 9, 8]),
  rec('S3', 'test_10', '2026-08-28', ['R. Subhasri', 26, 5, 10, 12], ['R. Mounika', 25, 6, 8, 11], ['P. Rithish', 26, 4, 6, 10]),
  rec('S3', 'test_11', '2026-09-03', ['R. Subhasri', 26, 6, 12, 11], ['R. Mounika', 25, 5, 10, 9], ['M. Sabari', 22, 5, 8, 8]),
  rec('S3', 'test_12', '2026-09-15', ['R. Mounika', 35, 7, 15, 14], ['R. Subhasri', 33, 6, 13, 13], ['M. Sabari', 30, 7, 10, 11]),

  // S4 Tests 7 to 12
  rec('S4', 'test_7', '2026-08-07', ['V. Siddeshwaran', 33, 5, 11, 9], ['K. Divya', 28, 3, 9, 13], ['R. Suryarajendran', 21, 5, 10, 9]),
  rec('S4', 'test_8', '2026-08-14', ['K. Divya', 33, 10, 14, 16], ['V. Keerthana', 38, 5, 11, 12], ['V. Siddeshwaran', 29, 5, 8, 11]),
  rec('S4', 'test_9', '2026-08-21', ['K. Dharshini', 35, 8, 17, 16], ['V. Keerthana', 36, 8, 14, 15], ['K. Divya', 38, 7, 14, 13]),
  rec('S4', 'test_10', '2026-08-28', ['V. Siddeshwaran', 26, 8, 12, 17], ['P. Mothika', 25, 6, 10, 16], ['K. Divya', 26, 6, 10, 15]),
  rec('S4', 'test_11', '2026-09-03', ['V. Siddeshwaran', 22, 2, 15, 17], ['P. Mothika', 19, 4, 15, 15], ['K. Divya', 19, 3, 11, 15]),
  rec('S4', 'test_12', '2026-09-15', ['V. Siddeshwaran', 47, 8, 20, 22], ['R. Suryarajendiran', 46, 9, 21, 20], ['P. Mothika', 48, 6, 14, 21]),

  // S5 Tests 7 to 12
  rec('S5', 'test_7', '2026-08-07', ['Poomozhi Yazhini', 34, 5, 14, 15], ['Bhuvaneswari', 25, 3, 11, 10], ['Brinda Sri', 23, 3, 10, 9]),
  rec('S5', 'test_8', '2026-08-14', ['Brinda Sri', 25, 4, 11, 13], ['Poomozhi Yazhini', 24, 3, 18, 12], ['Bhuvaneswari', 23, 4, 7, 5]),
  rec('S5', 'test_9', '2026-08-21', ['Poomozhi Yazhini', 37, 4, 4, 9], ['Bhuvaneswari', 33, 4, 8, 4], ['Devika', 26, 5, 7, 5]),
  rec('S5', 'test_10', '2026-08-28', ['Brintha Sri', 38, 8, 9, 14], ['Poomozhi Yazhini', 38, 9, 9, 11], ['Thenisha', 39, 6, 8, 14]),
  rec('S5', 'test_11', '2026-09-03', ['Brintha Sri', 46, 9, 17, 18], ['Poomozhi Yazhini', 45, 10, 17, 12], ['Bhuvaneswari', 37, 9, 17, 18]),
  rec('S5', 'test_12', '2026-09-15', ['Poomozhi Yazhini', 41, 7, 15, 15], ['Thenisha', 38, 8, 13, 14], ['Brintha Sri', 35, 8, 14, 12]),

  // S6 Tests 7 to 12
  rec('S6', 'test_7', '2026-08-07', ['Keerthi', 41, 8, 8, 14], ['Aswini', 43, 8, 9, 10], ['Gayathri', 39, 9, 8, 13]),
  rec('S6', 'test_8', '2026-08-14', ['Kavipriya', 28, 5, 8, 8], ['Gayathri', 18, 8, 10, 10], ['Jansirani', 24, 4, 9, 8]),
  rec('S6', 'test_9', '2026-08-21', ['Kavipriya', 36, 4, 9, 9], ['Jansirani', 35, 4, 6, 10], ['Aswini', 35, 3, 9, 7]),
  rec('S6', 'test_10', '2026-08-28', ['Muthulakshmi', 31, 5, 8, 10], ['Kavipriya', 31, 6, 7, 7], ['Vivek', 29, 5, 5, 7]),
  rec('S6', 'test_11', '2026-09-03', ['Kavipriya', 31, 4, 9, 13], ['Ragul Kumar', 23, 6, 8, 11], ['Devaraj', 20, 2, 8, 8]),
  rec('S6', 'test_12', '2026-09-15', ['Muthulakshmi', 39, 6, 18, 15], ['Vivek', 46, 10, 10, 9], ['Kavipriya', 51, 6, 10, 11]),

  // S7 Tests 7 to 12
  rec('S7', 'test_7', '2026-08-07', ['Pavithra', 24, 7, 12, 13], ['Monisha', 23, 6, 11, 12], ['Vetrivel', 23, 6, 10, 11]),
  rec('S7', 'test_8', '2026-08-14', ['Pavithra', 23, 6, 12, 12], ['Monisha', 22, 5, 11, 10], ['Harini', 20, 5, 11, 9]),
  rec('S7', 'test_9', '2026-08-21', ['Pavithra', 32, 8, 13, 13], ['Monisha', 31, 8, 12, 11], ['Harini', 30, 7, 11, 11]),
  rec('S7', 'test_10', '2026-08-28', ['Pavithra', 31, 7, 9, 11], ['Harini', 28, 6, 11, 9], ['Monisha', 29, 7, 10, 11]),
  rec('S7', 'test_11', '2026-09-03', ['Pavithra', 28, 7, 11, 11], ['Harini', 28, 6, 10, 9], ['Monisha', 21, 6, 10, 9]),
  rec('S7', 'test_12', '2026-09-15', ['Monisha', 27, 8, 16, 7], ['Kanishka', 39, 4, 10, 15], ['Monusri', 30, 6, 14, 10]),

  // S8 Tests 7 to 12
  rec('S8', 'test_7', '2026-08-07', ['Moulika', 34, 3, 10, 16], ['Marappan', 33, 3, 12, 16], ['Srikanth', 32, 3, 12, 17]),
  rec('S8', 'test_8', '2026-08-14', ['Naveen Kumar', 45, 9, 18, 10], ['Moulika', 43, 9, 19, 5], ['Balachandran', 45, 9, 17, 3]),
  rec('S8', 'test_9', '2026-08-21', ['Naveen Kumar', 28, 10, 13, 4], ['Sharma', 12, 3, 5, 4], ['Srikanth', 16, 6, 4, 8]),
  rec('S8', 'test_10', '2026-08-28', ['Moulika', 26, 7, 13, 8], ['Srikanth', 25, 7, 9, 10], ['Naveen Kumar', 25, 7, 12, 2]),
  rec('S8', 'test_11', '2026-09-03', ['Marappan', 11, 5, 11, 10], ['Sharma', 13, 5, 12, 8], ['Naveen Kumar', 11, 5, 11, 9]),
  rec('S8', 'test_12', '2026-09-15', ['Srikanth', 47, 10, 6, 13], ['Naveen Kumar', 48, 4, 9, 9], ['Moulika', 48, 5, 11, 7]),

  // S9 Tests 7 to 12
  rec('S9', 'test_7', '2026-08-07', ['Srivarthan', 37, 8, 16, 16], ['Gobinath', 36, 8, 16, 16], ['Kiruthika', 30, 9, 16, 11]),
  rec('S9', 'test_8', '2026-08-14', ['Kiruthika', 26, 6, 12, 8], ['Srivarthan', 22, 5, 14, 10], ['Gobinath', 22, 5, 12, 10]),
  rec('S9', 'test_9', '2026-08-21', ['Haripritha J', 32, 6, 12, 8], ['Kanishkadevi', 25, 8, 16, 8], ['Kiruthika S', 29, 8, 15, 5]),
  rec('S9', 'test_10', '2026-08-28', ['Gobinath', 34, 6, 5, 4], ['Vijith', 31, 4, 6, 6], ['Srivarthan', 30, 4, 6, 5]),
  rec('S9', 'test_11', '2026-09-03', ['M. Aarthi', 23, 6, 10, 11], ['N. Kanishkadevi', 22, 6, 8, 10], ['S. Krithika', 19, 6, 6, 7]),
  rec('S9', 'test_12', '2026-09-15', ['M. Aarthi', 44, 15, 12, 16], ['N. Kanishkadevi', 47, 15, 13, 12], ['Haripritha', 57, 9, 11, 14]),

  // S10 Tests 7 to 12
  rec('S10', 'test_7', '2026-08-07', ['G. Kaviya', 22, 3, 8, 10], ['C. Bhuvaneshwari', 21, 3, 8, 10], ['R. Sriraj', 21, 3, 7, 10]),
  rec('S10', 'test_8', '2026-08-14', ['C. Bhuvaneswari', 33, 2, 2, 4], ['P. Dhanasri', 32, 2, 2, 4], ['G. Kaviya', 32, 2, 2, 4]),
  rec('S10', 'test_9', '2026-08-21', ['A. Mohamed Athaullah', 33, 5, 8, 9], ['C. Bhuvaneshwari', 33, 4, 10, 8], ['P. Dhanasri', 33, 3, 10, 8]),
  rec('S10', 'test_10', '2026-08-28', ['C. Bhuvaneswari', 33, 3, 10, 9], ['G. Kaviya', 32, 3, 9, 8], ['P. Dhanasri', 31, 2, 9, 8]),
  rec('S10', 'test_11', '2026-09-03', ['A. Mohamed Athaullah', 34, 5, 12, 14], ['M. Yeswanth', 30, 5, 7, 6], ['C. Bhuvaneswari', 29, 5, 5, 11]),
  rec('S10', 'test_12', '2026-09-15', ['R. Sriraj', 38, 10, 12, 12], ['C. Bhuvaneswari', 36, 6, 11, 10], ['G. Kaviya', 35, 6, 11, 9]),

  // S11 Tests 7 to 12
  rec('S11', 'test_7', '2026-08-07', ['M. Navya Sri', 22, 2, 8, 11], ['T. Dhakshinya', 21, 5, 8, 11], ['Ajay', 17, 8, 9, 11]),
  rec('S11', 'test_8', '2026-08-14', ['M. Navya Sri', 30, 6, 8, 12], ['T. Dhakshinya', 35, 6, 4, 10], ['R. Vasudevan', 27, 7, 9, 4]),
  rec('S11', 'test_9', '2026-08-21', ['M. Navya Sri', 32, 4, 6, 8], ['J. Ajay', 20, 5, 4, 8], ['T. Dhakshinya', 22, 3, 4, 5]),
  rec('S11', 'test_10', '2026-08-28', ['R. Vasudevan', 32, 6, 12, 9], ['M. Navya Sri', 28, 5, 13, 14], ['T. Dhakshinya', 25, 7, 12, 14]),
  rec('S11', 'test_11', '2026-09-03', ['M. Navya Sri', 45, 9, 18, 16], ['S. Gayathri', 40, 9, 16, 17], ['R. Vasudevan', 29, 9, 17, 12]),
  rec('S11', 'test_12', '2026-09-15', ['M. Navya Sri', 73, 17, 30, 27], ['T. Dhakshinya', 60, 5, 23, 19], ['S. Gayathri', 57, 15, 27, 32]),

  // S12 Tests 7 to 12
  rec('S12', 'test_7', '2026-08-07', ['R. Srinithi', 22, 7, 7, 6], ['S. Vishnu', 23, 6, 5, 6], ['S. Sridevi', 22, 6, 5, 4]),
  rec('S12', 'test_8', '2026-08-14', ['R. Srinithi', 20, 5, 7, 6], ['R. Shivanisri', 21, 4, 5, 3], ['S. Sridevi', 18, 5, 6, 4]),
  rec('S12', 'test_9', '2026-08-21', ['S. Eniya', 17, 5, 6, 7], ['V. Jananika', 14, 5, 7, 8], ['S. Sridevi', 17, 6, 5, 6]),
  rec('S12', 'test_10', '2026-08-28', ['V. Jananika', 32, 9, 3, 7], ['R. Srinithi', 34, 9, 3, 5], ['S. Sridevi', 32, 8, 5, 5]),
  rec('S12', 'test_11', '2026-09-03', ['N. Mounishwaran', 25, 6, 9, 8], ['M. Jayaprakash', 24, 7, 7, 9], ['S. Eniya', 23, 6, 8, 8]),
  rec('S12', 'test_12', '2026-09-15', ['N. Mounishwaran', 23, 7, 6, 7], ['R. Shivanisri', 22, 6, 7, 7], ['S. Sridevi', 23, 7, 6, 5]),

  // S13 Tests 7 to 12
  rec('S13', 'test_7', '2026-08-07', ['P. Vaishnavi', 22, 6, 8, 8], ['A. B. Sadhana', 18, 5, 10, 10], ['M. Govarasa', 20, 3, 7, 7]),
  rec('S13', 'test_8', '2026-08-14', ['M. Govarasa', 17, 4, 3, 11], ['M. Sridiksha', 15, 3, 8, 7], ['E. Poovarasan', 15, 2, 5, 8]),
  rec('S13', 'test_9', '2026-08-21', ['M. Sridiksha', 18, 4, 6, 10], ['M. Priyadharshini', 13, 4, 6, 8], ['M. Govarasa', 16, 4, 8, 1]),
  rec('S13', 'test_10', '2026-08-28', ['M. Govarasa', 17, 3, 13, 11], ['A. B. Sadhana', 24, 2, 7, 7], ['V. Sowmiya', 20, 2, 7, 8]),
  rec('S13', 'test_11', '2026-09-03', ['M. Priyadharshini', 15, 5, 7, 12], ['S. Haritha', 19, 1, 7, 6], ['M. Sabila', 10, 3, 9, 7]),
  rec('S13', 'test_12', '2026-09-15', ['S. Haritha', 38, 4, 14, 8], ['M. Priyadarshini', 28, 4, 12, 13], ['M. Govarasa', 32, 3, 10, 11]),

  // S14 Tests 7 to 12
  rec('S14', 'test_7', '2026-08-07', ['M. Harish', 26, 2, 12, 10], ['C. Harish', 27, 0, 12, 9], ['A. Naveen Prabhu', 24, 2, 7, 14]),
  rec('S14', 'test_8', '2026-08-14', ['A. Naveen Prabhu', 31, 4, 8, 10], ['C. Tejas', 27, 6, 7, 10], ['M. Harish', 26, 5, 8, 9]),
  rec('S14', 'test_9', '2026-08-21', ['C. Tejas', 35, 4, 13, 9], ['M. Harish', 32, 3, 10, 12], ['A. Naveen Prabhu', 36, 3, 8, 6]),
  rec('S14', 'test_10', '2026-08-28', ['M. Harish', 31, 3, 13, 12], ['C. Tejas', 29, 5, 10, 11], ['A. Naveen Prabhu', 32, 3, 12, 6]),
  rec('S14', 'test_11', '2026-09-03', ['C. Tejas', 40, 6, 13, 14], ['A. Naveen Prabhu', 38, 5, 13, 12], ['M. Harish', 34, 2, 10, 13]),
  rec('S14', 'test_12', '2026-09-15', ['C. Tejas', 62, 11, 21, 14], ['A. Naveen Prabhu', 68, 9, 19, 12], ['M. Harish', 55, 4, 18, 19]),

  // S15 Tests 7 to 12
  rec('S15', 'test_7', '2026-08-07', ['Pragadheswari', 28, 3, 13, 7], ['R. Dharshini', 28, 3, 13, 7], ['A. Srikaran', 26, 3, 12, 7]),
  rec('S15', 'test_8', '2026-08-14', ['R. Dharshini', 25, 2, 7, 8], ['Pragathishwari', 25, 1, 7, 7], ['S. Vigneswaran', 25, 1, 6, 8]),
  rec('S15', 'test_9', '2026-08-21', ['S. Vigneshwaran', 35, 5, 5, 9], ['R. Dharshini', 32, 4, 9, 8], ['M. Mohith', 36, 3, 8, 4]),
  rec('S15', 'test_10', '2026-08-28', ['R. Dharshini', 33, 3, 8, 8], ['M. Mohith', 31, 4, 6, 4], ['A. Srikaran', 30, 3, 4, 5]),
  rec('S15', 'test_11', '2026-09-03', ['S. Vikneshwaran', 24, 8, 12, 12], ['M. Mohith', 22, 2, 9, 8], ['S. Pothraj', 11, 6, 4, 11]),
  rec('S15', 'test_12', '2026-09-15', ['M. Mohith', 55, 10, 28, 19], ['R. Dharshini', 45, 7, 16, 20], ['S. Pothraj', 45, 12, 13, 9]),

  // S16 Tests 7 to 12
  rec('S16', 'test_7', '2026-08-07', ['K. Yogadharsini', 39, 9, 13, 18], ['S. Venishka', 41, 7, 13, 17], ['R. Ramyasree', 39, 9, 12, 14]),
  rec('S16', 'test_8', '2026-08-14', ['R. Ramyasree', 42, 7, 14, 15], ['K. Yogadharsini', 40, 7, 13, 14], ['S. Haripravin', 32, 6, 12, 16]),
  rec('S16', 'test_9', '2026-08-21', ['R. Ramayasri', 37, 8, 16, 16], ['S. Venishka', 37, 8, 15, 16], ['S. Haripravin', 39, 6, 10, 14]),
  rec('S16', 'test_10', '2026-08-28', ['R. Ramayasri', 37, 8, 16, 16], ['S. Venishka', 37, 8, 15, 16], ['S. Haripravin', 39, 6, 10, 14]),
  rec('S16', 'test_11', '2026-09-03', ['R. Ramayasri', 37, 8, 16, 16], ['S. Venishka', 37, 8, 15, 16], ['S. Haripravin', 39, 6, 10, 14]),
  rec('S16', 'test_12', '2026-09-15', ['R. Ramayasri', 37, 8, 16, 16], ['S. Venishka', 37, 8, 15, 16], ['S. Haripravin', 39, 6, 10, 14]),

  // S17 Tests 7 to 12
  rec('S17', 'test_7', '2026-08-07', ['V. Sivani', 32, 5, 4, 6], ['R. Udhaya Shankar', 26, 5, 5, 8], ['K. Sivaranjani', 16, 7, 7, 7]),
  rec('S17', 'test_8', '2026-08-14', ['K. Sivaranjani', 31, 1, 2, 9], ['M. Vetri Vel', 25, 3, 5, 7], ['V. Sivani', 29, 1, 1, 4]),
  rec('S17', 'test_9', '2026-08-21', ['V. Sivani', 33, 4, 5, 10], ['R. Udhaya Shankar', 25, 6, 6, 11], ['A. Jayakumar', 23, 5, 7, 9]),
  rec('S17', 'test_10', '2026-08-28', ['V. Sivani', 32, 5, 5, 5], ['A. Jayakumar', 30, 4, 7, 5], ['R. Udhaya Shanker', 30, 1, 5, 9]),
  rec('S17', 'test_11', '2026-09-03', ['V. Shivani', 21, 4, 11, 6], ['K. Sivaranjani', 14, 2, 5, 7], ['A. Jayakumar', 18, 3, 7, 9]),
  rec('S17', 'test_12', '2026-09-15', ['V. Shivani', 61, 7, 17, 9], ['K. Sivaranjani', 44, 8, 13, 14], ['R. Udhaya Shankar', 37, 7, 12, 8]),

  // S18 Tests 7 to 12
  rec('S18', 'test_7', '2026-08-07', ['V. Sharanya', 38, 10, 17, 18], ['V. Dharshana', 34, 8, 19, 17], ['T. Swasthikasri', 30, 10, 19, 18]),
  rec('S18', 'test_8', '2026-08-14', ['V. Sharanya', 45, 9, 19, 19], ['T. Swasthikasri', 41, 10, 17, 19], ['G. Janani', 40, 10, 17, 18]),
  rec('S18', 'test_9', '2026-08-21', ['T. Swasthikasri', 35, 8, 16, 13], ['V. Sharanya', 28, 10, 13, 11], ['V. Dharshana', 27, 6, 15, 12]),
  rec('S18', 'test_10', '2026-08-28', ['V. Nideeshbharathi', 35, 4, 10, 15], ['V. Dharshana', 35, 5, 9, 11], ['V. Sharanya', 32, 10, 7, 7]),
  rec('S18', 'test_11', '2026-09-03', ['T. Swasthikasri', 46, 9, 15, 18], ['V. Sharanya', 42, 7, 18, 16], ['S. Kirthik', 40, 8, 18, 16]),
  rec('S18', 'test_12', '2026-09-15', ['V. Sharanya', 45, 20, 28, 32], ['S. Kirthik', 47, 19, 28, 39], ['V. Dharshana', 51, 15, 26, 34]),

  // S19 Tests 7 to 12
  rec('S19', 'test_7', '2026-08-07', ['S. Vinothini', 41, 9, 15, 16], ['S. Selvam', 28, 8, 13, 15], ['S. Janani', 27, 8, 13, 14]),
  rec('S19', 'test_8', '2026-08-14', ['S. Vinothini', 41, 6, 9, 8], ['M. Immanuvel', 37, 5, 10, 10], ['S. Selvam', 27, 6, 9, 8]),
  rec('S19', 'test_9', '2026-08-21', ['S. Vinothini', 38, 8, 13, 13], ['M. Immanuvel', 31, 7, 12, 12], ['S. Selvam', 30, 7, 11, 11]),
  rec('S19', 'test_10', '2026-08-28', ['S. Selvam', 40, 6, 8, 6], ['S. Vinothini', 31, 8, 6, 7], ['M. Immanuvel', 28, 8, 6, 7]),
  rec('S19', 'test_11', '2026-09-03', ['S. Vinothini', 46, 9, 15, 18], ['M. Immanuvel', 42, 7, 18, 16], ['S. Selvam', 40, 8, 18, 16]),
  rec('S19', 'test_12', '2026-09-15', ['S. Selvam', 46, 9, 15, 18], ['S. Vinothini', 42, 7, 18, 16], ['M. Immanuvel', 40, 8, 18, 16]),

  // S20 Tests 7 to 12
  rec('S20', 'test_7', '2026-08-07', ['M. Boobesh', 28, 7, 14, 16], ['Vasanth', 27, 5, 7, 11], ['Mohith', 26, 6, 7, 10]),
  rec('S20', 'test_8', '2026-08-14', ['M. Boobesh', 30, 5, 15, 16], ['S. Kanishka', 29, 2, 11, 7], ['Navadharshna', 23, 3, 11, 13]),
  rec('S20', 'test_9', '2026-08-21', ['M. Boobesh', 37, 7, 16, 17], ['S. Kanishka', 30, 6, 9, 13], ['V. Vasanth', 30, 3, 12, 12]),
  rec('S20', 'test_10', '2026-08-28', ['M. Boobesh', 40, 8, 14, 19], ['R. Navadharshana', 31, 7, 11, 11], ['V. Rithika', 28, 7, 7, 8]),
  rec('S20', 'test_11', '2026-09-03', ['M. Boobesh', 35, 5, 12, 20], ['D. Dharun', 28, 6, 13, 14], ['S. Kanishka', 20, 5, 12, 16]),
  rec('S20', 'test_12', '2026-09-15', ['M. Boobesh', 79, 16, 21, 28], ['S. Kanishka', 65, 8, 12, 18], ['R. Navadharshana', 33, 9, 17, 17]),

  // S21 Tests 7 to 12
  rec('S21', 'test_7', '2026-08-07', ['S. Swathi', 24, 6, 9, 12], ['S. Dhanya Sri', 21, 8, 9, 12], ['S. Sri Chaitanya', 21, 6, 9, 12]),
  rec('S21', 'test_8', '2026-08-14', ['S. Swathi', 25, 8, 11, 12], ['S. Dhanya Sri', 23, 7, 10, 10], ['S. Sri Chaitanya', 21, 7, 10, 11]),
  rec('S21', 'test_9', '2026-08-21', ['S. Swathi', 47, 9, 15, 17], ['S. Dhanya Sri', 45, 8, 15, 16], ['S. Sri Chaitanya', 44, 8, 14, 16]),
  rec('S21', 'test_10', '2026-08-28', ['S. Swathi', 30, 5, 9, 11], ['S. Dhanya Sri', 29, 3, 9, 9], ['S. Sri Chaitanya', 27, 2, 3, 11]),
  rec('S21', 'test_11', '2026-09-03', ['S. Swathi', 36, 4, 5, 9], ['S. Dhanya Sri', 25, 6, 6, 6], ['S. Sri Chaitanya', 19, 7, 4, 7]),
  rec('S21', 'test_12', '2026-09-15', ['S. Swathi', 46, 10, 19, 18], ['S. Dhanya Sri', 44, 10, 18, 16], ['S. Sri Chaitanya', 41, 9, 18, 17]),

  // S22 Tests 7 to 12
  rec('S22', 'test_7', '2026-08-07', ['A. Subasri', 23, 3, 7, 13], ['S. Ammu', 21, 3, 9, 7], ['S. Roshini', 20, 2, 6, 7]),
  rec('S22', 'test_8', '2026-08-14', ['A. Subasri', 23, 2, 7, 13], ['S. Ammu', 22, 3, 8, 9], ['S. Roshini', 20, 2, 6, 7]),
  rec('S22', 'test_9', '2026-08-21', ['S. Ammu', 28, 4, 11, 8], ['A. Subasri', 25, 2, 13, 10], ['R. Manikandan', 20, 2, 7, 9]),
  rec('S22', 'test_10', '2026-08-28', ['S. Ammu', 26, 2, 4, 9], ['A. Subasri', 23, 3, 14, 7], ['S. Datshya', 22, 4, 10, 9]),
  rec('S22', 'test_11', '2026-09-03', ['A. Subasri', 22, 2, 4, 15], ['S. Ammu', 25, 2, 7, 9], ['M. Mohanbabu', 16, 4, 7, 10]),
  rec('S22', 'test_12', '2026-09-15', ['A. Subasri', 40, 8, 12, 13], ['S. Datshya', 41, 9, 12, 10], ['S. Ammu', 32, 9, 14, 14]),

  // S23 Tests 7 to 12
  rec('S23', 'test_7', '2026-08-07', ['K. Varnisha', 17, 3, 9, 7], ['R. Kanishka', 17, 4, 8, 6], ['B. Tharun', 16, 4, 4, 5]),
  rec('S23', 'test_8', '2026-08-14', ['K. Varnisha', 16, 3, 5, 8], ['R. Kanishka', 12, 3, 6, 7], ['B. Tharun', 14, 2, 5, 4]),
  rec('S23', 'test_9', '2026-08-21', ['K. Varnisha', 30, 3, 8, 8], ['R. Kanishka', 26, 5, 8, 5], ['B. Tharun', 18, 2, 4, 5]),
  rec('S23', 'test_10', '2026-08-28', ['K. Varnisha', 27, 0, 5, 2], ['B. Tharun', 22, 3, 4, 5], ['R. Kanishka', 20, 3, 5, 4]),
  rec('S23', 'test_11', '2026-09-03', ['K. Varnisha', 21, 2, 11, 11], ['R. Kanishka', 17, 0, 11, 10], ['B. Tharun', 12, 4, 2, 2]),
  rec('S23', 'test_12', '2026-09-15', ['K. Varnisha', 32, 6, 13, 9], ['R. Kanishka', 27, 6, 5, 20], ['B. Tharun', 16, 7, 14, 5]),

  // S24 Tests 7 to 12
  rec('S24', 'test_7', '2026-08-07', ['A. Jeeva', 22, 6, 9, 8], ['D. Vinothkumar', 25, 7, 11, 12], ['M. Malathi', 21, 5, 8, 7]),
  rec('S24', 'test_8', '2026-08-14', ['A. Jeeva', 13, 4, 9, 12], ['D. Vinothkumar', 18, 5, 11, 11], ['M. Malathi', 14, 3, 6, 9]),
  rec('S24', 'test_9', '2026-08-21', ['A. Jeeva', 22, 6, 11, 9], ['D. Vinothkumar', 20, 5, 9, 8], ['M. Malathi', 19, 5, 7, 7]),
  rec('S24', 'test_10', '2026-08-28', ['A. Jeeva', 22, 5, 6, 9], ['D. Vinothkumar', 25, 6, 5, 10], ['M. Malathi', 20, 4, 5, 9]),
  rec('S24', 'test_11', '2026-09-03', ['A. Jeeva', 18, 5, 11, 11], ['D. Vinothkumar', 17, 4, 9, 10], ['M. Malathi', 16, 4, 8, 9]),
  rec('S24', 'test_12', '2026-09-15', ['A. Jeeva', 22, 6, 11, 15], ['D. Vinothkumar', 27, 7, 13, 12], ['M. Malathi', 20, 5, 10, 9]),

  // S25 Tests 7 to 12
  rec('S25', 'test_7', '2026-08-07', ['Preethikasri', 27, 3, 7, 3], ['Keerthika', 22, 6, 5, 8], ['Rithika', 17, 3, 3, 6]),
  rec('S25', 'test_8', '2026-08-14', ['Preethikasri', 24, 1, 6, 7], ['Keerthika', 20, 4, 8, 4], ['Boomika', 20, 2, 2, 8]),
  rec('S25', 'test_9', '2026-08-21', ['Keerthika', 24, 3, 7, 9], ['Preethikasri', 25, 1, 8, 9], ['Boomika', 22, 2, 6, 7]),
  rec('S25', 'test_10', '2026-08-28', ['Preethikasri', 24, 5, 7, 10], ['Boomika', 21, 5, 6, 9], ['Keerthika', 21, 4, 5, 9]),
  rec('S25', 'test_11', '2026-09-03', ['Preethikasri', 17, 5, 12, 10], ['Boomika', 15, 4, 10, 9], ['Keerthika', 12, 4, 9, 9]),
  rec('S25', 'test_12', '2026-09-15', ['Preethikasri', 42, 7, 14, 17], ['Boomika', 40, 6, 12, 17], ['Keerthika', 41, 6, 13, 15]),

  // S26 Tests 7 to 12
  rec('S26', 'test_7', '2026-08-07', ['S. Mahalakshmi', 26, 3, 5, 9], ['R. Prithika', 20, 3, 10, 6], ['E. Deepika', 22, 4, 5, 8]),
  rec('S26', 'test_8', '2026-08-14', ['S. Nisha', 19, 4, 9, 8], ['E. Deepika', 22, 4, 5, 8], ['K. Sanjana', 19, 5, 9, 6]),
  rec('S26', 'test_9', '2026-08-21', ['S. Mahalakshmi', 19, 2, 9, 10], ['M. Amsaveni', 16, 7, 7, 10], ['R. Preethika', 18, 5, 7, 7]),
  rec('S26', 'test_10', '2026-08-28', ['S. Mahalakshmi', 27, 5, 6, 8], ['R. Preethika', 25, 5, 5, 10], ['C. Mahalakshmi', 20, 3, 5, 9]),
  rec('S26', 'test_11', '2026-09-03', ['S. Mahalakshmi', 25, 5, 8, 7], ['E. Deepika', 25, 5, 6, 8], ['K. Sanjana', 24, 5, 5, 9]),
  rec('S26', 'test_12', '2026-09-15', ['M. Amsaveni', 44, 7, 10, 12], ['S. Mahalakshmi', 39, 7, 15, 9], ['C. Nanthini', 35, 7, 7, 12]),
];
