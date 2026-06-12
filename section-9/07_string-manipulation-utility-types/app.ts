type EventName = "click" | "hover";

type HandlerName = `on${Capitalize<EventName>}`;