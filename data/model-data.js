/*
 * Data layer for "Hiểu mình — Hiểu nghề".
 *
 * Research rule (DIAGRAM_MODEL_AUDIT_PHASE1.md §9): the status and the source of
 * every relationship are DATA, not assumptions hidden inside animation code.
 * Only the four pairs listed in `relationships` are ever drawn. Every other
 * combination of person-side and work-side items is intentionally left open,
 * because no source for this model has been supplied yet.
 */
window.CareerModelData = {
  /* Person side: lenses for looking at oneself. Not ingredients of a score. */
  person: [
    {
      id: 'interests',
      label: 'Sở thích nghề nghiệp',
      short: 'Sở thích',
      question: 'Tôi thích điều gì?',
      description: 'Những hoạt động và lĩnh vực thu hút sự chú ý, hứng thú của một người.'
    },
    {
      id: 'values',
      label: 'Giá trị công việc',
      short: 'Giá trị',
      question: 'Tôi coi trọng điều gì?',
      description: 'Những điều một người coi trọng khi nhìn vào trải nghiệm và ý nghĩa của công việc.'
    },
    {
      id: 'abilities',
      label: 'Năng lực',
      short: 'Năng lực',
      question: 'Tôi làm tốt điều gì?',
      description: 'Những khả năng liên quan đến việc thực hiện nhiệm vụ và yêu cầu của công việc.'
    },
    {
      id: 'styles',
      label: 'Cách làm việc',
      short: 'Cách làm việc',
      question: 'Tôi làm việc tốt trong điều kiện nào?',
      description: 'Những khuynh hướng liên quan đến cách một người tiếp cận công việc và môi trường làm việc.'
    }
  ],

  /* Work side: characteristics of an occupation, not of a person. */
  work: [
    { id: 'activities',   label: 'Hoạt động / nhiệm vụ',   short: 'Nhiệm vụ' },
    { id: 'context',      label: 'Bối cảnh làm việc',      short: 'Bối cảnh' },
    { id: 'requirements', label: 'Yêu cầu của nghề',       short: 'Năng lực yêu cầu' },
    { id: 'workValues',   label: 'Giá trị của công việc',  short: 'Giá trị' }
  ],

  /*
   * Three levels of evidence. Each one has a text label and a shape, so the
   * meaning never depends on colour alone.
   */
  statuses: {
    linked: {
      label: 'Có dữ liệu liên kết',
      hint: 'O*NET công bố dữ liệu liên kết giữa hai lĩnh vực này.'
    },
    occupation: {
      label: 'Có dữ liệu theo nghề',
      hint: 'O*NET gắn lĩnh vực này với từng nghề cụ thể.'
    },
    domain: {
      label: 'Ở mức lĩnh vực',
      hint: 'Có cơ sở ở mức khái niệm; trang này không so sánh định lượng.'
    }
  },

  /* The only pairs that are drawn. */
  relationships: [
    {
      personId: 'interests',
      workId: 'activities',
      status: 'occupation',
      question: 'Những hoạt động thường gặp trong nghề này có gần với điều mình thấy hứng thú không?',
      personText: 'Những hoạt động và lĩnh vực thu hút sự chú ý và hứng thú của bạn.',
      workText: 'Những việc người làm nghề thực sự làm: nhiệm vụ, hoạt động, đối tượng làm việc cùng.',
      basis: 'O*NET gắn các nhóm sở thích nghề nghiệp với những nghề minh họa. Việc đọc qua hoạt động và nhiệm vụ là cách diễn giải của trang này.',
      limit: 'Hứng thú với một hoạt động chưa nói được bạn có hài lòng với cả nghề hay không.',
      sources: ['onet-interests', 'onet-content']
    },
    {
      personId: 'values',
      workId: 'workValues',
      status: 'domain',
      question: 'Điều mình coi trọng có xuất hiện trong trải nghiệm làm việc của nghề này không?',
      personText: 'Những điều bạn coi trọng khi nghĩ về ý nghĩa và trải nghiệm của công việc.',
      workText: 'Những đặc điểm mà công việc có thể mang lại. O*NET công bố điểm Work Values theo từng nghề.',
      basis: 'Quan hệ này được đọc ở mức lĩnh vực: giá trị cá nhân đặt cạnh giá trị của công việc, chưa phải một phép đối chiếu định lượng.',
      limit: 'Hai bên cùng dùng chữ “giá trị” nhưng đo hai điều khác nhau, nên trang này không so điểm giữa chúng.',
      sources: ['onet-values', 'nauta-2010']
    },
    {
      personId: 'abilities',
      workId: 'requirements',
      status: 'linked',
      question: 'Mình đã có, hoặc muốn phát triển, những năng lực mà nghề này thường yêu cầu không?',
      personText: 'Những khả năng liên quan đến việc thực hiện nhiệm vụ.',
      workText: 'Những năng lực, kỹ năng và kiến thức mà nghề thường yêu cầu.',
      basis: 'O*NET biểu diễn năng lực và yêu cầu nghề, kèm các liên kết giữa năng lực và bối cảnh công việc.',
      limit: 'Năng lực có thể phát triển. Một yêu cầu hiện tại không phải là giới hạn của bạn.',
      sources: ['onet-content', 'onet-reference']
    },
    {
      personId: 'styles',
      workId: 'context',
      status: 'linked',
      question: 'Bối cảnh làm việc này đòi hỏi gì ở cách mình thường làm việc?',
      personText: 'Khuynh hướng trong cách bạn tiếp cận công việc, ví dụ tính cẩn thận, chủ động hay hợp tác.',
      workText: 'Điều kiện và hoàn cảnh nơi công việc diễn ra: làm việc với ai, áp lực thời gian, mức tự do trong cách làm.',
      basis: 'O*NET 31.0 có bộ dữ liệu liên kết trực tiếp giữa Work Styles và Work Context. Đây là quan hệ được ghi nhận rõ nhất trong mô hình này.',
      limit: 'Đây là khuynh hướng, không phải một kiểu người cố định.',
      sources: ['onet-styles-context', 'onet-content']
    }
  ],

  sources: [
    {
      id: 'onet-content',
      title: 'The O*NET Content Model',
      publisher: 'O*NET Resource Center',
      url: 'https://www.onetcenter.org/content.html'
    },
    {
      id: 'onet-reference',
      title: 'Content Model Reference (bản 31.0)',
      publisher: 'O*NET Resource Center',
      url: 'https://www.onetcenter.org/dictionary/31.0/csv/content_model_reference.html'
    },
    {
      id: 'onet-styles-context',
      title: 'Work Styles to Work Context (bản 31.0)',
      publisher: 'O*NET Resource Center',
      url: 'https://www.onetcenter.org/dictionary/31.0/csv/work_styles_to_work_context.html'
    },
    {
      id: 'onet-interests',
      title: 'Interests: Illustrative Occupations (bản 31.0)',
      publisher: 'O*NET Resource Center',
      url: 'https://www.onetcenter.org/dictionary/31.0/json/interests_illustrative_occupations.html'
    },
    {
      id: 'onet-values',
      title: 'Work Values',
      publisher: 'O*NET Resource Center',
      url: 'https://www.onetcenter.org/dictionary/29.2/text/work_values.html'
    },
    {
      id: 'nauta-2010',
      title: 'The development, evolution, and status of Holland’s theory of vocational personalities',
      publisher: 'Nauta, M. M. (2010). Journal of Counseling Psychology',
      url: 'https://pubmed.ncbi.nlm.nih.gov/21133557/'
    }
  ],

  /*
   * Career profiles are READ THROUGH the four work-side items. Each attribute
   * key equals a work id above.
   *
   * These profiles are illustrative examples written for this project. They
   * have NOT yet been checked entry by entry against O*NET occupation data.
   */
  careers: {
    architect: {
      label: 'Kiến trúc sư',
      term: 'Architect',
      subtitle: 'Thiết kế không gian và giải quyết vấn đề.',
      activities:   ['Phân tích yêu cầu', 'Phát triển phương án', 'Phối hợp với nhiều bên'],
      context:      ['Studio', 'Công trường', 'Làm việc với khách hàng và đội ngũ kỹ thuật'],
      requirements: ['Tư duy không gian', 'Giải quyết vấn đề', 'Giao tiếp chuyên môn'],
      workValues:   ['Chất lượng', 'Tính sáng tạo', 'Kết quả hữu hình']
    },
    psychologist: {
      label: 'Nhà tâm lý học',
      term: 'Psychologist',
      subtitle: 'Làm việc với hành vi, trải nghiệm và bằng chứng.',
      activities:   ['Phỏng vấn', 'Đánh giá', 'Phân tích', 'Thiết kế can thiệp hoặc nghiên cứu'],
      context:      ['Phòng tư vấn', 'Cơ sở giáo dục', 'Tổ chức', 'Môi trường nghiên cứu'],
      requirements: ['Lắng nghe', 'Phân tích', 'Giao tiếp', 'Tư duy nghiên cứu'],
      workValues:   ['Con người', 'Bằng chứng', 'Phát triển', 'Đạo đức nghề nghiệp']
    },
    designer: {
      label: 'Nhà thiết kế',
      term: 'Designer',
      subtitle: 'Chuyển vấn đề thành hệ thống và trải nghiệm.',
      activities:   ['Nghiên cứu người dùng', 'Tạo ý tưởng', 'Thử nghiệm', 'Hoàn thiện giải pháp'],
      context:      ['Studio', 'Nhóm liên ngành', 'Thời gian dự án thay đổi'],
      requirements: ['Tư duy hình ảnh', 'Tổng hợp', 'Thử nghiệm', 'Trình bày'],
      workValues:   ['Sáng tạo', 'Trải nghiệm', 'Tác động', 'Học hỏi']
    },
    teacher: {
      label: 'Giáo viên',
      term: 'Teacher',
      subtitle: 'Tổ chức việc học và tương tác với người học.',
      activities:   ['Chuẩn bị bài', 'Hướng dẫn', 'Quan sát', 'Phản hồi', 'Điều chỉnh'],
      context:      ['Lớp học', 'Cộng đồng học tập', 'Phối hợp với phụ huynh và đồng nghiệp'],
      requirements: ['Giao tiếp', 'Tổ chức', 'Giải thích', 'Quan sát'],
      workValues:   ['Phát triển con người', 'Đóng góp', 'Học tập', 'Trách nhiệm']
    }
  }
};
