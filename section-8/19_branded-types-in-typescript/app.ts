declare const brand: unique symbol;

type Brand<T, BrandName> = T & {
  readonly [brand]: BrandName;
};

type UserId = Brand<string, "UserId">;
type CourseId = Brand<string, "CourseId">;
type Email = Brand<string, "Email">;

function enrollUser(userId: UserId, courseId: CourseId) {
  console.log(userId, courseId);
}

function createUserId(value: string): UserId {
  if (!value.startsWith("user_")) {
    throw new Error("Invalid UserId");
  }

  return value as UserId;
}

function createCourseId(value: string): CourseId {
  if (!value.startsWith("course_")) {
    throw new Error("Invalid CourseId");
  }

  return value as CourseId;
}

const userId = createUserId("user_123");
const courseId = createCourseId("course_456");

enrollUser(userId, courseId);
// enrollUser(courseId, userId);
