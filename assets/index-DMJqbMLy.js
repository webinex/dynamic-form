import require$$1, { useContext, useMemo, useCallback, useState, useRef, useLayoutEffect, useEffect, memo, StrictMode } from "react";
import require$$2 from "react-dom";
import * as Yup from "yup";
import { Typography, Divider as Divider$1, Rate as Rate$1, Tag, Button, Form as Form$1, List, Affix, Menu, Space, Tooltip, Input as Input$1, Select as Select$1, Row, Col, Empty, Flex, Modal, Checkbox, message, Radio, Tabs } from "antd";
import { Form } from "@webinex/antik";
import { useField, useFormikContext, getIn, Formik } from "formik";
import { ErrorBoundary } from "react-error-boundary";
import classNames from "classnames";
import { ArrowUpOutlined, ArrowDownOutlined, DeleteOutlined, PlusOutlined, EditOutlined, QuestionCircleOutlined as QuestionCircleOutlined$6 } from "@ant-design/icons";
import { flexy } from "@webinex/flexy";
(function polyfill() {
  const relList = document.createElement("link").relList;
  if (relList && relList.supports && relList.supports("modulepreload")) {
    return;
  }
  for (const link of document.querySelectorAll('link[rel="modulepreload"]')) {
    processPreload(link);
  }
  new MutationObserver((mutations) => {
    for (const mutation of mutations) {
      if (mutation.type !== "childList") {
        continue;
      }
      for (const node of mutation.addedNodes) {
        if (node.tagName === "LINK" && node.rel === "modulepreload")
          processPreload(node);
      }
    }
  }).observe(document, { childList: true, subtree: true });
  function getFetchOpts(link) {
    const fetchOpts = {};
    if (link.integrity) fetchOpts.integrity = link.integrity;
    if (link.referrerPolicy) fetchOpts.referrerPolicy = link.referrerPolicy;
    if (link.crossOrigin === "use-credentials")
      fetchOpts.credentials = "include";
    else if (link.crossOrigin === "anonymous") fetchOpts.credentials = "omit";
    else fetchOpts.credentials = "same-origin";
    return fetchOpts;
  }
  function processPreload(link) {
    if (link.ep)
      return;
    link.ep = true;
    const fetchOpts = getFetchOpts(link);
    fetch(link.href, fetchOpts);
  }
})();
function getDefaultExportFromCjs(x) {
  return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, "default") ? x["default"] : x;
}
function getAugmentedNamespace(n) {
  if (n.__esModule) return n;
  var f = n.default;
  if (typeof f == "function") {
    var a = function a2() {
      if (this instanceof a2) {
        return Reflect.construct(f, arguments, this.constructor);
      }
      return f.apply(this, arguments);
    };
    a.prototype = f.prototype;
  } else a = {};
  Object.defineProperty(a, "__esModule", { value: true });
  Object.keys(n).forEach(function(k) {
    var d = Object.getOwnPropertyDescriptor(n, k);
    Object.defineProperty(a, k, d.get ? d : {
      enumerable: true,
      get: function() {
        return n[k];
      }
    });
  });
  return a;
}
var jsxRuntime = { exports: {} };
var reactJsxRuntime_production = {};
/**
 * @license React
 * react-jsx-runtime.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var REACT_ELEMENT_TYPE$1 = Symbol.for("react.transitional.element"), REACT_FRAGMENT_TYPE$1 = Symbol.for("react.fragment");
function jsxProd(type, config, maybeKey) {
  var key = null;
  void 0 !== maybeKey && (key = "" + maybeKey);
  void 0 !== config.key && (key = "" + config.key);
  if ("key" in config) {
    maybeKey = {};
    for (var propName in config)
      "key" !== propName && (maybeKey[propName] = config[propName]);
  } else maybeKey = config;
  config = maybeKey.ref;
  return {
    $$typeof: REACT_ELEMENT_TYPE$1,
    type,
    key,
    ref: void 0 !== config ? config : null,
    props: maybeKey
  };
}
reactJsxRuntime_production.Fragment = REACT_FRAGMENT_TYPE$1;
reactJsxRuntime_production.jsx = jsxProd;
reactJsxRuntime_production.jsxs = jsxProd;
{
  jsxRuntime.exports = reactJsxRuntime_production;
}
var jsxRuntimeExports = jsxRuntime.exports;
var client = { exports: {} };
var reactDomClient_production = {};
var scheduler = { exports: {} };
var scheduler_production = {};
/**
 * @license React
 * scheduler.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(exports) {
  function push2(heap, node) {
    var index2 = heap.length;
    heap.push(node);
    a: for (; 0 < index2; ) {
      var parentIndex = index2 - 1 >>> 1, parent = heap[parentIndex];
      if (0 < compare(parent, node))
        heap[parentIndex] = node, heap[index2] = parent, index2 = parentIndex;
      else break a;
    }
  }
  function peek(heap) {
    return 0 === heap.length ? null : heap[0];
  }
  function pop2(heap) {
    if (0 === heap.length) return null;
    var first = heap[0], last = heap.pop();
    if (last !== first) {
      heap[0] = last;
      a: for (var index2 = 0, length = heap.length, halfLength = length >>> 1; index2 < halfLength; ) {
        var leftIndex = 2 * (index2 + 1) - 1, left = heap[leftIndex], rightIndex = leftIndex + 1, right = heap[rightIndex];
        if (0 > compare(left, last))
          rightIndex < length && 0 > compare(right, left) ? (heap[index2] = right, heap[rightIndex] = last, index2 = rightIndex) : (heap[index2] = left, heap[leftIndex] = last, index2 = leftIndex);
        else if (rightIndex < length && 0 > compare(right, last))
          heap[index2] = right, heap[rightIndex] = last, index2 = rightIndex;
        else break a;
      }
    }
    return first;
  }
  function compare(a, b) {
    var diff = a.sortIndex - b.sortIndex;
    return 0 !== diff ? diff : a.id - b.id;
  }
  exports.unstable_now = void 0;
  if ("object" === typeof performance && "function" === typeof performance.now) {
    var localPerformance = performance;
    exports.unstable_now = function() {
      return localPerformance.now();
    };
  } else {
    var localDate = Date, initialTime = localDate.now();
    exports.unstable_now = function() {
      return localDate.now() - initialTime;
    };
  }
  var taskQueue = [], timerQueue = [], taskIdCounter = 1, currentTask = null, currentPriorityLevel = 3, isPerformingWork = false, isHostCallbackScheduled = false, isHostTimeoutScheduled = false, localSetTimeout = "function" === typeof setTimeout ? setTimeout : null, localClearTimeout = "function" === typeof clearTimeout ? clearTimeout : null, localSetImmediate = "undefined" !== typeof setImmediate ? setImmediate : null;
  function advanceTimers(currentTime) {
    for (var timer = peek(timerQueue); null !== timer; ) {
      if (null === timer.callback) pop2(timerQueue);
      else if (timer.startTime <= currentTime)
        pop2(timerQueue), timer.sortIndex = timer.expirationTime, push2(taskQueue, timer);
      else break;
      timer = peek(timerQueue);
    }
  }
  function handleTimeout(currentTime) {
    isHostTimeoutScheduled = false;
    advanceTimers(currentTime);
    if (!isHostCallbackScheduled)
      if (null !== peek(taskQueue))
        isHostCallbackScheduled = true, requestHostCallback();
      else {
        var firstTimer = peek(timerQueue);
        null !== firstTimer && requestHostTimeout(handleTimeout, firstTimer.startTime - currentTime);
      }
  }
  var isMessageLoopRunning = false, taskTimeoutID = -1, frameInterval = 5, startTime = -1;
  function shouldYieldToHost() {
    return exports.unstable_now() - startTime < frameInterval ? false : true;
  }
  function performWorkUntilDeadline() {
    if (isMessageLoopRunning) {
      var currentTime = exports.unstable_now();
      startTime = currentTime;
      var hasMoreWork = true;
      try {
        a: {
          isHostCallbackScheduled = false;
          isHostTimeoutScheduled && (isHostTimeoutScheduled = false, localClearTimeout(taskTimeoutID), taskTimeoutID = -1);
          isPerformingWork = true;
          var previousPriorityLevel = currentPriorityLevel;
          try {
            b: {
              advanceTimers(currentTime);
              for (currentTask = peek(taskQueue); null !== currentTask && !(currentTask.expirationTime > currentTime && shouldYieldToHost()); ) {
                var callback = currentTask.callback;
                if ("function" === typeof callback) {
                  currentTask.callback = null;
                  currentPriorityLevel = currentTask.priorityLevel;
                  var continuationCallback = callback(
                    currentTask.expirationTime <= currentTime
                  );
                  currentTime = exports.unstable_now();
                  if ("function" === typeof continuationCallback) {
                    currentTask.callback = continuationCallback;
                    advanceTimers(currentTime);
                    hasMoreWork = true;
                    break b;
                  }
                  currentTask === peek(taskQueue) && pop2(taskQueue);
                  advanceTimers(currentTime);
                } else pop2(taskQueue);
                currentTask = peek(taskQueue);
              }
              if (null !== currentTask) hasMoreWork = true;
              else {
                var firstTimer = peek(timerQueue);
                null !== firstTimer && requestHostTimeout(
                  handleTimeout,
                  firstTimer.startTime - currentTime
                );
                hasMoreWork = false;
              }
            }
            break a;
          } finally {
            currentTask = null, currentPriorityLevel = previousPriorityLevel, isPerformingWork = false;
          }
          hasMoreWork = void 0;
        }
      } finally {
        hasMoreWork ? schedulePerformWorkUntilDeadline() : isMessageLoopRunning = false;
      }
    }
  }
  var schedulePerformWorkUntilDeadline;
  if ("function" === typeof localSetImmediate)
    schedulePerformWorkUntilDeadline = function() {
      localSetImmediate(performWorkUntilDeadline);
    };
  else if ("undefined" !== typeof MessageChannel) {
    var channel = new MessageChannel(), port = channel.port2;
    channel.port1.onmessage = performWorkUntilDeadline;
    schedulePerformWorkUntilDeadline = function() {
      port.postMessage(null);
    };
  } else
    schedulePerformWorkUntilDeadline = function() {
      localSetTimeout(performWorkUntilDeadline, 0);
    };
  function requestHostCallback() {
    isMessageLoopRunning || (isMessageLoopRunning = true, schedulePerformWorkUntilDeadline());
  }
  function requestHostTimeout(callback, ms) {
    taskTimeoutID = localSetTimeout(function() {
      callback(exports.unstable_now());
    }, ms);
  }
  exports.unstable_IdlePriority = 5;
  exports.unstable_ImmediatePriority = 1;
  exports.unstable_LowPriority = 4;
  exports.unstable_NormalPriority = 3;
  exports.unstable_Profiling = null;
  exports.unstable_UserBlockingPriority = 2;
  exports.unstable_cancelCallback = function(task) {
    task.callback = null;
  };
  exports.unstable_continueExecution = function() {
    isHostCallbackScheduled || isPerformingWork || (isHostCallbackScheduled = true, requestHostCallback());
  };
  exports.unstable_forceFrameRate = function(fps) {
    0 > fps || 125 < fps ? console.error(
      "forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"
    ) : frameInterval = 0 < fps ? Math.floor(1e3 / fps) : 5;
  };
  exports.unstable_getCurrentPriorityLevel = function() {
    return currentPriorityLevel;
  };
  exports.unstable_getFirstCallbackNode = function() {
    return peek(taskQueue);
  };
  exports.unstable_next = function(eventHandler) {
    switch (currentPriorityLevel) {
      case 1:
      case 2:
      case 3:
        var priorityLevel = 3;
        break;
      default:
        priorityLevel = currentPriorityLevel;
    }
    var previousPriorityLevel = currentPriorityLevel;
    currentPriorityLevel = priorityLevel;
    try {
      return eventHandler();
    } finally {
      currentPriorityLevel = previousPriorityLevel;
    }
  };
  exports.unstable_pauseExecution = function() {
  };
  exports.unstable_requestPaint = function() {
  };
  exports.unstable_runWithPriority = function(priorityLevel, eventHandler) {
    switch (priorityLevel) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        priorityLevel = 3;
    }
    var previousPriorityLevel = currentPriorityLevel;
    currentPriorityLevel = priorityLevel;
    try {
      return eventHandler();
    } finally {
      currentPriorityLevel = previousPriorityLevel;
    }
  };
  exports.unstable_scheduleCallback = function(priorityLevel, callback, options2) {
    var currentTime = exports.unstable_now();
    "object" === typeof options2 && null !== options2 ? (options2 = options2.delay, options2 = "number" === typeof options2 && 0 < options2 ? currentTime + options2 : currentTime) : options2 = currentTime;
    switch (priorityLevel) {
      case 1:
        var timeout = -1;
        break;
      case 2:
        timeout = 250;
        break;
      case 5:
        timeout = 1073741823;
        break;
      case 4:
        timeout = 1e4;
        break;
      default:
        timeout = 5e3;
    }
    timeout = options2 + timeout;
    priorityLevel = {
      id: taskIdCounter++,
      callback,
      priorityLevel,
      startTime: options2,
      expirationTime: timeout,
      sortIndex: -1
    };
    options2 > currentTime ? (priorityLevel.sortIndex = options2, push2(timerQueue, priorityLevel), null === peek(taskQueue) && priorityLevel === peek(timerQueue) && (isHostTimeoutScheduled ? (localClearTimeout(taskTimeoutID), taskTimeoutID = -1) : isHostTimeoutScheduled = true, requestHostTimeout(handleTimeout, options2 - currentTime))) : (priorityLevel.sortIndex = timeout, push2(taskQueue, priorityLevel), isHostCallbackScheduled || isPerformingWork || (isHostCallbackScheduled = true, requestHostCallback()));
    return priorityLevel;
  };
  exports.unstable_shouldYield = shouldYieldToHost;
  exports.unstable_wrapCallback = function(callback) {
    var parentPriorityLevel = currentPriorityLevel;
    return function() {
      var previousPriorityLevel = currentPriorityLevel;
      currentPriorityLevel = parentPriorityLevel;
      try {
        return callback.apply(this, arguments);
      } finally {
        currentPriorityLevel = previousPriorityLevel;
      }
    };
  };
})(scheduler_production);
{
  scheduler.exports = scheduler_production;
}
var schedulerExports = scheduler.exports;
/**
 * @license React
 * react-dom-client.production.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Scheduler = schedulerExports, React$3 = require$$1, ReactDOM = require$$2;
function formatProdErrorMessage(code) {
  var url = "https://react.dev/errors/" + code;
  if (1 < arguments.length) {
    url += "?args[]=" + encodeURIComponent(arguments[1]);
    for (var i = 2; i < arguments.length; i++)
      url += "&args[]=" + encodeURIComponent(arguments[i]);
  }
  return "Minified React error #" + code + "; visit " + url + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
function isValidContainer(node) {
  return !(!node || 1 !== node.nodeType && 9 !== node.nodeType && 11 !== node.nodeType);
}
var REACT_LEGACY_ELEMENT_TYPE = Symbol.for("react.element"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_PROVIDER_TYPE = Symbol.for("react.provider"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy");
var REACT_OFFSCREEN_TYPE = Symbol.for("react.offscreen");
var REACT_MEMO_CACHE_SENTINEL = Symbol.for("react.memo_cache_sentinel"), MAYBE_ITERATOR_SYMBOL = Symbol.iterator;
function getIteratorFn(maybeIterable) {
  if (null === maybeIterable || "object" !== typeof maybeIterable) return null;
  maybeIterable = MAYBE_ITERATOR_SYMBOL && maybeIterable[MAYBE_ITERATOR_SYMBOL] || maybeIterable["@@iterator"];
  return "function" === typeof maybeIterable ? maybeIterable : null;
}
var REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference");
function getComponentNameFromType(type) {
  if (null == type) return null;
  if ("function" === typeof type)
    return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
  if ("string" === typeof type) return type;
  switch (type) {
    case REACT_FRAGMENT_TYPE:
      return "Fragment";
    case REACT_PORTAL_TYPE:
      return "Portal";
    case REACT_PROFILER_TYPE:
      return "Profiler";
    case REACT_STRICT_MODE_TYPE:
      return "StrictMode";
    case REACT_SUSPENSE_TYPE:
      return "Suspense";
    case REACT_SUSPENSE_LIST_TYPE:
      return "SuspenseList";
  }
  if ("object" === typeof type)
    switch (type.$$typeof) {
      case REACT_CONTEXT_TYPE:
        return (type.displayName || "Context") + ".Provider";
      case REACT_CONSUMER_TYPE:
        return (type._context.displayName || "Context") + ".Consumer";
      case REACT_FORWARD_REF_TYPE:
        var innerType = type.render;
        type = type.displayName;
        type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
        return type;
      case REACT_MEMO_TYPE:
        return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
      case REACT_LAZY_TYPE:
        innerType = type._payload;
        type = type._init;
        try {
          return getComponentNameFromType(type(innerType));
        } catch (x) {
        }
    }
  return null;
}
var ReactSharedInternals = React$3.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, assign = Object.assign, prefix, suffix;
function describeBuiltInComponentFrame(name) {
  if (void 0 === prefix)
    try {
      throw Error();
    } catch (x) {
      var match = x.stack.trim().match(/\n( *(at )?)/);
      prefix = match && match[1] || "";
      suffix = -1 < x.stack.indexOf("\n    at") ? " (<anonymous>)" : -1 < x.stack.indexOf("@") ? "@unknown:0:0" : "";
    }
  return "\n" + prefix + name + suffix;
}
var reentry = false;
function describeNativeComponentFrame(fn, construct) {
  if (!fn || reentry) return "";
  reentry = true;
  var previousPrepareStackTrace = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    var RunInRootFrame = {
      DetermineComponentFrameRoot: function() {
        try {
          if (construct) {
            var Fake = function() {
              throw Error();
            };
            Object.defineProperty(Fake.prototype, "props", {
              set: function() {
                throw Error();
              }
            });
            if ("object" === typeof Reflect && Reflect.construct) {
              try {
                Reflect.construct(Fake, []);
              } catch (x) {
                var control = x;
              }
              Reflect.construct(fn, [], Fake);
            } else {
              try {
                Fake.call();
              } catch (x$0) {
                control = x$0;
              }
              fn.call(Fake.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (x$1) {
              control = x$1;
            }
            (Fake = fn()) && "function" === typeof Fake.catch && Fake.catch(function() {
            });
          }
        } catch (sample) {
          if (sample && control && "string" === typeof sample.stack)
            return [sample.stack, control.stack];
        }
        return [null, null];
      }
    };
    RunInRootFrame.DetermineComponentFrameRoot.displayName = "DetermineComponentFrameRoot";
    var namePropDescriptor = Object.getOwnPropertyDescriptor(
      RunInRootFrame.DetermineComponentFrameRoot,
      "name"
    );
    namePropDescriptor && namePropDescriptor.configurable && Object.defineProperty(
      RunInRootFrame.DetermineComponentFrameRoot,
      "name",
      { value: "DetermineComponentFrameRoot" }
    );
    var _RunInRootFrame$Deter = RunInRootFrame.DetermineComponentFrameRoot(), sampleStack = _RunInRootFrame$Deter[0], controlStack = _RunInRootFrame$Deter[1];
    if (sampleStack && controlStack) {
      var sampleLines = sampleStack.split("\n"), controlLines = controlStack.split("\n");
      for (namePropDescriptor = RunInRootFrame = 0; RunInRootFrame < sampleLines.length && !sampleLines[RunInRootFrame].includes("DetermineComponentFrameRoot"); )
        RunInRootFrame++;
      for (; namePropDescriptor < controlLines.length && !controlLines[namePropDescriptor].includes(
        "DetermineComponentFrameRoot"
      ); )
        namePropDescriptor++;
      if (RunInRootFrame === sampleLines.length || namePropDescriptor === controlLines.length)
        for (RunInRootFrame = sampleLines.length - 1, namePropDescriptor = controlLines.length - 1; 1 <= RunInRootFrame && 0 <= namePropDescriptor && sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]; )
          namePropDescriptor--;
      for (; 1 <= RunInRootFrame && 0 <= namePropDescriptor; RunInRootFrame--, namePropDescriptor--)
        if (sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
          if (1 !== RunInRootFrame || 1 !== namePropDescriptor) {
            do
              if (RunInRootFrame--, namePropDescriptor--, 0 > namePropDescriptor || sampleLines[RunInRootFrame] !== controlLines[namePropDescriptor]) {
                var frame = "\n" + sampleLines[RunInRootFrame].replace(" at new ", " at ");
                fn.displayName && frame.includes("<anonymous>") && (frame = frame.replace("<anonymous>", fn.displayName));
                return frame;
              }
            while (1 <= RunInRootFrame && 0 <= namePropDescriptor);
          }
          break;
        }
    }
  } finally {
    reentry = false, Error.prepareStackTrace = previousPrepareStackTrace;
  }
  return (previousPrepareStackTrace = fn ? fn.displayName || fn.name : "") ? describeBuiltInComponentFrame(previousPrepareStackTrace) : "";
}
function describeFiber(fiber) {
  switch (fiber.tag) {
    case 26:
    case 27:
    case 5:
      return describeBuiltInComponentFrame(fiber.type);
    case 16:
      return describeBuiltInComponentFrame("Lazy");
    case 13:
      return describeBuiltInComponentFrame("Suspense");
    case 19:
      return describeBuiltInComponentFrame("SuspenseList");
    case 0:
    case 15:
      return fiber = describeNativeComponentFrame(fiber.type, false), fiber;
    case 11:
      return fiber = describeNativeComponentFrame(fiber.type.render, false), fiber;
    case 1:
      return fiber = describeNativeComponentFrame(fiber.type, true), fiber;
    default:
      return "";
  }
}
function getStackByFiberInDevAndProd(workInProgress2) {
  try {
    var info = "";
    do
      info += describeFiber(workInProgress2), workInProgress2 = workInProgress2.return;
    while (workInProgress2);
    return info;
  } catch (x) {
    return "\nError generating stack: " + x.message + "\n" + x.stack;
  }
}
function getNearestMountedFiber(fiber) {
  var node = fiber, nearestMounted = fiber;
  if (fiber.alternate) for (; node.return; ) node = node.return;
  else {
    fiber = node;
    do
      node = fiber, 0 !== (node.flags & 4098) && (nearestMounted = node.return), fiber = node.return;
    while (fiber);
  }
  return 3 === node.tag ? nearestMounted : null;
}
function getSuspenseInstanceFromFiber(fiber) {
  if (13 === fiber.tag) {
    var suspenseState = fiber.memoizedState;
    null === suspenseState && (fiber = fiber.alternate, null !== fiber && (suspenseState = fiber.memoizedState));
    if (null !== suspenseState) return suspenseState.dehydrated;
  }
  return null;
}
function assertIsMounted(fiber) {
  if (getNearestMountedFiber(fiber) !== fiber)
    throw Error(formatProdErrorMessage(188));
}
function findCurrentFiberUsingSlowPath(fiber) {
  var alternate = fiber.alternate;
  if (!alternate) {
    alternate = getNearestMountedFiber(fiber);
    if (null === alternate) throw Error(formatProdErrorMessage(188));
    return alternate !== fiber ? null : fiber;
  }
  for (var a = fiber, b = alternate; ; ) {
    var parentA = a.return;
    if (null === parentA) break;
    var parentB = parentA.alternate;
    if (null === parentB) {
      b = parentA.return;
      if (null !== b) {
        a = b;
        continue;
      }
      break;
    }
    if (parentA.child === parentB.child) {
      for (parentB = parentA.child; parentB; ) {
        if (parentB === a) return assertIsMounted(parentA), fiber;
        if (parentB === b) return assertIsMounted(parentA), alternate;
        parentB = parentB.sibling;
      }
      throw Error(formatProdErrorMessage(188));
    }
    if (a.return !== b.return) a = parentA, b = parentB;
    else {
      for (var didFindChild = false, child$2 = parentA.child; child$2; ) {
        if (child$2 === a) {
          didFindChild = true;
          a = parentA;
          b = parentB;
          break;
        }
        if (child$2 === b) {
          didFindChild = true;
          b = parentA;
          a = parentB;
          break;
        }
        child$2 = child$2.sibling;
      }
      if (!didFindChild) {
        for (child$2 = parentB.child; child$2; ) {
          if (child$2 === a) {
            didFindChild = true;
            a = parentB;
            b = parentA;
            break;
          }
          if (child$2 === b) {
            didFindChild = true;
            b = parentB;
            a = parentA;
            break;
          }
          child$2 = child$2.sibling;
        }
        if (!didFindChild) throw Error(formatProdErrorMessage(189));
      }
    }
    if (a.alternate !== b) throw Error(formatProdErrorMessage(190));
  }
  if (3 !== a.tag) throw Error(formatProdErrorMessage(188));
  return a.stateNode.current === a ? fiber : alternate;
}
function findCurrentHostFiberImpl(node) {
  var tag = node.tag;
  if (5 === tag || 26 === tag || 27 === tag || 6 === tag) return node;
  for (node = node.child; null !== node; ) {
    tag = findCurrentHostFiberImpl(node);
    if (null !== tag) return tag;
    node = node.sibling;
  }
  return null;
}
var isArrayImpl = Array.isArray, ReactDOMSharedInternals = ReactDOM.__DOM_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, sharedNotPendingObject = {
  pending: false,
  data: null,
  method: null,
  action: null
}, valueStack = [], index = -1;
function createCursor(defaultValue) {
  return { current: defaultValue };
}
function pop(cursor) {
  0 > index || (cursor.current = valueStack[index], valueStack[index] = null, index--);
}
function push(cursor, value) {
  index++;
  valueStack[index] = cursor.current;
  cursor.current = value;
}
var contextStackCursor = createCursor(null), contextFiberStackCursor = createCursor(null), rootInstanceStackCursor = createCursor(null), hostTransitionProviderCursor = createCursor(null);
function pushHostContainer(fiber, nextRootInstance) {
  push(rootInstanceStackCursor, nextRootInstance);
  push(contextFiberStackCursor, fiber);
  push(contextStackCursor, null);
  fiber = nextRootInstance.nodeType;
  switch (fiber) {
    case 9:
    case 11:
      nextRootInstance = (nextRootInstance = nextRootInstance.documentElement) ? (nextRootInstance = nextRootInstance.namespaceURI) ? getOwnHostContext(nextRootInstance) : 0 : 0;
      break;
    default:
      if (fiber = 8 === fiber ? nextRootInstance.parentNode : nextRootInstance, nextRootInstance = fiber.tagName, fiber = fiber.namespaceURI)
        fiber = getOwnHostContext(fiber), nextRootInstance = getChildHostContextProd(fiber, nextRootInstance);
      else
        switch (nextRootInstance) {
          case "svg":
            nextRootInstance = 1;
            break;
          case "math":
            nextRootInstance = 2;
            break;
          default:
            nextRootInstance = 0;
        }
  }
  pop(contextStackCursor);
  push(contextStackCursor, nextRootInstance);
}
function popHostContainer() {
  pop(contextStackCursor);
  pop(contextFiberStackCursor);
  pop(rootInstanceStackCursor);
}
function pushHostContext(fiber) {
  null !== fiber.memoizedState && push(hostTransitionProviderCursor, fiber);
  var context = contextStackCursor.current;
  var JSCompiler_inline_result = getChildHostContextProd(context, fiber.type);
  context !== JSCompiler_inline_result && (push(contextFiberStackCursor, fiber), push(contextStackCursor, JSCompiler_inline_result));
}
function popHostContext(fiber) {
  contextFiberStackCursor.current === fiber && (pop(contextStackCursor), pop(contextFiberStackCursor));
  hostTransitionProviderCursor.current === fiber && (pop(hostTransitionProviderCursor), HostTransitionContext._currentValue = sharedNotPendingObject);
}
var hasOwnProperty = Object.prototype.hasOwnProperty, scheduleCallback$3 = Scheduler.unstable_scheduleCallback, cancelCallback$1 = Scheduler.unstable_cancelCallback, shouldYield = Scheduler.unstable_shouldYield, requestPaint = Scheduler.unstable_requestPaint, now = Scheduler.unstable_now, getCurrentPriorityLevel = Scheduler.unstable_getCurrentPriorityLevel, ImmediatePriority = Scheduler.unstable_ImmediatePriority, UserBlockingPriority = Scheduler.unstable_UserBlockingPriority, NormalPriority$1 = Scheduler.unstable_NormalPriority, LowPriority = Scheduler.unstable_LowPriority, IdlePriority = Scheduler.unstable_IdlePriority, log$1 = Scheduler.log, unstable_setDisableYieldValue = Scheduler.unstable_setDisableYieldValue, rendererID = null, injectedHook = null;
function onCommitRoot(root2) {
  if (injectedHook && "function" === typeof injectedHook.onCommitFiberRoot)
    try {
      injectedHook.onCommitFiberRoot(
        rendererID,
        root2,
        void 0,
        128 === (root2.current.flags & 128)
      );
    } catch (err) {
    }
}
function setIsStrictModeForDevtools(newIsStrictMode) {
  "function" === typeof log$1 && unstable_setDisableYieldValue(newIsStrictMode);
  if (injectedHook && "function" === typeof injectedHook.setStrictMode)
    try {
      injectedHook.setStrictMode(rendererID, newIsStrictMode);
    } catch (err) {
    }
}
var clz32 = Math.clz32 ? Math.clz32 : clz32Fallback, log = Math.log, LN2 = Math.LN2;
function clz32Fallback(x) {
  x >>>= 0;
  return 0 === x ? 32 : 31 - (log(x) / LN2 | 0) | 0;
}
var nextTransitionLane = 128, nextRetryLane = 4194304;
function getHighestPriorityLanes(lanes) {
  var pendingSyncLanes = lanes & 42;
  if (0 !== pendingSyncLanes) return pendingSyncLanes;
  switch (lanes & -lanes) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
      return 64;
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return lanes & 4194176;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      return lanes & 62914560;
    case 67108864:
      return 67108864;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 0;
    default:
      return lanes;
  }
}
function getNextLanes(root2, wipLanes) {
  var pendingLanes = root2.pendingLanes;
  if (0 === pendingLanes) return 0;
  var nextLanes = 0, suspendedLanes = root2.suspendedLanes, pingedLanes = root2.pingedLanes, warmLanes = root2.warmLanes;
  root2 = 0 !== root2.finishedLanes;
  var nonIdlePendingLanes = pendingLanes & 134217727;
  0 !== nonIdlePendingLanes ? (pendingLanes = nonIdlePendingLanes & ~suspendedLanes, 0 !== pendingLanes ? nextLanes = getHighestPriorityLanes(pendingLanes) : (pingedLanes &= nonIdlePendingLanes, 0 !== pingedLanes ? nextLanes = getHighestPriorityLanes(pingedLanes) : root2 || (warmLanes = nonIdlePendingLanes & ~warmLanes, 0 !== warmLanes && (nextLanes = getHighestPriorityLanes(warmLanes))))) : (nonIdlePendingLanes = pendingLanes & ~suspendedLanes, 0 !== nonIdlePendingLanes ? nextLanes = getHighestPriorityLanes(nonIdlePendingLanes) : 0 !== pingedLanes ? nextLanes = getHighestPriorityLanes(pingedLanes) : root2 || (warmLanes = pendingLanes & ~warmLanes, 0 !== warmLanes && (nextLanes = getHighestPriorityLanes(warmLanes))));
  return 0 === nextLanes ? 0 : 0 !== wipLanes && wipLanes !== nextLanes && 0 === (wipLanes & suspendedLanes) && (suspendedLanes = nextLanes & -nextLanes, warmLanes = wipLanes & -wipLanes, suspendedLanes >= warmLanes || 32 === suspendedLanes && 0 !== (warmLanes & 4194176)) ? wipLanes : nextLanes;
}
function checkIfRootIsPrerendering(root2, renderLanes2) {
  return 0 === (root2.pendingLanes & ~(root2.suspendedLanes & ~root2.pingedLanes) & renderLanes2);
}
function computeExpirationTime(lane, currentTime) {
  switch (lane) {
    case 1:
    case 2:
    case 4:
    case 8:
      return currentTime + 250;
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return currentTime + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
      return -1;
    case 67108864:
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function claimNextTransitionLane() {
  var lane = nextTransitionLane;
  nextTransitionLane <<= 1;
  0 === (nextTransitionLane & 4194176) && (nextTransitionLane = 128);
  return lane;
}
function claimNextRetryLane() {
  var lane = nextRetryLane;
  nextRetryLane <<= 1;
  0 === (nextRetryLane & 62914560) && (nextRetryLane = 4194304);
  return lane;
}
function createLaneMap(initial) {
  for (var laneMap = [], i = 0; 31 > i; i++) laneMap.push(initial);
  return laneMap;
}
function markRootUpdated$1(root2, updateLane) {
  root2.pendingLanes |= updateLane;
  268435456 !== updateLane && (root2.suspendedLanes = 0, root2.pingedLanes = 0, root2.warmLanes = 0);
}
function markRootFinished(root2, finishedLanes, remainingLanes, spawnedLane, updatedLanes, suspendedRetryLanes) {
  var previouslyPendingLanes = root2.pendingLanes;
  root2.pendingLanes = remainingLanes;
  root2.suspendedLanes = 0;
  root2.pingedLanes = 0;
  root2.warmLanes = 0;
  root2.expiredLanes &= remainingLanes;
  root2.entangledLanes &= remainingLanes;
  root2.errorRecoveryDisabledLanes &= remainingLanes;
  root2.shellSuspendCounter = 0;
  var entanglements = root2.entanglements, expirationTimes = root2.expirationTimes, hiddenUpdates = root2.hiddenUpdates;
  for (remainingLanes = previouslyPendingLanes & ~remainingLanes; 0 < remainingLanes; ) {
    var index$7 = 31 - clz32(remainingLanes), lane = 1 << index$7;
    entanglements[index$7] = 0;
    expirationTimes[index$7] = -1;
    var hiddenUpdatesForLane = hiddenUpdates[index$7];
    if (null !== hiddenUpdatesForLane)
      for (hiddenUpdates[index$7] = null, index$7 = 0; index$7 < hiddenUpdatesForLane.length; index$7++) {
        var update = hiddenUpdatesForLane[index$7];
        null !== update && (update.lane &= -536870913);
      }
    remainingLanes &= ~lane;
  }
  0 !== spawnedLane && markSpawnedDeferredLane(root2, spawnedLane, 0);
  0 !== suspendedRetryLanes && 0 === updatedLanes && 0 !== root2.tag && (root2.suspendedLanes |= suspendedRetryLanes & ~(previouslyPendingLanes & ~finishedLanes));
}
function markSpawnedDeferredLane(root2, spawnedLane, entangledLanes) {
  root2.pendingLanes |= spawnedLane;
  root2.suspendedLanes &= ~spawnedLane;
  var spawnedLaneIndex = 31 - clz32(spawnedLane);
  root2.entangledLanes |= spawnedLane;
  root2.entanglements[spawnedLaneIndex] = root2.entanglements[spawnedLaneIndex] | 1073741824 | entangledLanes & 4194218;
}
function markRootEntangled(root2, entangledLanes) {
  var rootEntangledLanes = root2.entangledLanes |= entangledLanes;
  for (root2 = root2.entanglements; rootEntangledLanes; ) {
    var index$8 = 31 - clz32(rootEntangledLanes), lane = 1 << index$8;
    lane & entangledLanes | root2[index$8] & entangledLanes && (root2[index$8] |= entangledLanes);
    rootEntangledLanes &= ~lane;
  }
}
function lanesToEventPriority(lanes) {
  lanes &= -lanes;
  return 2 < lanes ? 8 < lanes ? 0 !== (lanes & 134217727) ? 32 : 268435456 : 8 : 2;
}
function resolveUpdatePriority() {
  var updatePriority = ReactDOMSharedInternals.p;
  if (0 !== updatePriority) return updatePriority;
  updatePriority = window.event;
  return void 0 === updatePriority ? 32 : getEventPriority(updatePriority.type);
}
function runWithPriority(priority, fn) {
  var previousPriority = ReactDOMSharedInternals.p;
  try {
    return ReactDOMSharedInternals.p = priority, fn();
  } finally {
    ReactDOMSharedInternals.p = previousPriority;
  }
}
var randomKey = Math.random().toString(36).slice(2), internalInstanceKey = "__reactFiber$" + randomKey, internalPropsKey = "__reactProps$" + randomKey, internalContainerInstanceKey = "__reactContainer$" + randomKey, internalEventHandlersKey = "__reactEvents$" + randomKey, internalEventHandlerListenersKey = "__reactListeners$" + randomKey, internalEventHandlesSetKey = "__reactHandles$" + randomKey, internalRootNodeResourcesKey = "__reactResources$" + randomKey, internalHoistableMarker = "__reactMarker$" + randomKey;
function detachDeletedInstance(node) {
  delete node[internalInstanceKey];
  delete node[internalPropsKey];
  delete node[internalEventHandlersKey];
  delete node[internalEventHandlerListenersKey];
  delete node[internalEventHandlesSetKey];
}
function getClosestInstanceFromNode(targetNode) {
  var targetInst = targetNode[internalInstanceKey];
  if (targetInst) return targetInst;
  for (var parentNode = targetNode.parentNode; parentNode; ) {
    if (targetInst = parentNode[internalContainerInstanceKey] || parentNode[internalInstanceKey]) {
      parentNode = targetInst.alternate;
      if (null !== targetInst.child || null !== parentNode && null !== parentNode.child)
        for (targetNode = getParentSuspenseInstance(targetNode); null !== targetNode; ) {
          if (parentNode = targetNode[internalInstanceKey]) return parentNode;
          targetNode = getParentSuspenseInstance(targetNode);
        }
      return targetInst;
    }
    targetNode = parentNode;
    parentNode = targetNode.parentNode;
  }
  return null;
}
function getInstanceFromNode(node) {
  if (node = node[internalInstanceKey] || node[internalContainerInstanceKey]) {
    var tag = node.tag;
    if (5 === tag || 6 === tag || 13 === tag || 26 === tag || 27 === tag || 3 === tag)
      return node;
  }
  return null;
}
function getNodeFromInstance(inst) {
  var tag = inst.tag;
  if (5 === tag || 26 === tag || 27 === tag || 6 === tag) return inst.stateNode;
  throw Error(formatProdErrorMessage(33));
}
function getResourcesFromRoot(root2) {
  var resources = root2[internalRootNodeResourcesKey];
  resources || (resources = root2[internalRootNodeResourcesKey] = { hoistableStyles: /* @__PURE__ */ new Map(), hoistableScripts: /* @__PURE__ */ new Map() });
  return resources;
}
function markNodeAsHoistable(node) {
  node[internalHoistableMarker] = true;
}
var allNativeEvents = /* @__PURE__ */ new Set(), registrationNameDependencies = {};
function registerTwoPhaseEvent(registrationName, dependencies) {
  registerDirectEvent(registrationName, dependencies);
  registerDirectEvent(registrationName + "Capture", dependencies);
}
function registerDirectEvent(registrationName, dependencies) {
  registrationNameDependencies[registrationName] = dependencies;
  for (registrationName = 0; registrationName < dependencies.length; registrationName++)
    allNativeEvents.add(dependencies[registrationName]);
}
var canUseDOM = !("undefined" === typeof window || "undefined" === typeof window.document || "undefined" === typeof window.document.createElement), VALID_ATTRIBUTE_NAME_REGEX = RegExp(
  "^[:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD][:A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040]*$"
), illegalAttributeNameCache = {}, validatedAttributeNameCache = {};
function isAttributeNameSafe(attributeName) {
  if (hasOwnProperty.call(validatedAttributeNameCache, attributeName))
    return true;
  if (hasOwnProperty.call(illegalAttributeNameCache, attributeName)) return false;
  if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName))
    return validatedAttributeNameCache[attributeName] = true;
  illegalAttributeNameCache[attributeName] = true;
  return false;
}
function setValueForAttribute(node, name, value) {
  if (isAttributeNameSafe(name))
    if (null === value) node.removeAttribute(name);
    else {
      switch (typeof value) {
        case "undefined":
        case "function":
        case "symbol":
          node.removeAttribute(name);
          return;
        case "boolean":
          var prefix$10 = name.toLowerCase().slice(0, 5);
          if ("data-" !== prefix$10 && "aria-" !== prefix$10) {
            node.removeAttribute(name);
            return;
          }
      }
      node.setAttribute(name, "" + value);
    }
}
function setValueForKnownAttribute(node, name, value) {
  if (null === value) node.removeAttribute(name);
  else {
    switch (typeof value) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        node.removeAttribute(name);
        return;
    }
    node.setAttribute(name, "" + value);
  }
}
function setValueForNamespacedAttribute(node, namespace, name, value) {
  if (null === value) node.removeAttribute(name);
  else {
    switch (typeof value) {
      case "undefined":
      case "function":
      case "symbol":
      case "boolean":
        node.removeAttribute(name);
        return;
    }
    node.setAttributeNS(namespace, name, "" + value);
  }
}
function getToStringValue(value) {
  switch (typeof value) {
    case "bigint":
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return value;
    case "object":
      return value;
    default:
      return "";
  }
}
function isCheckable(elem) {
  var type = elem.type;
  return (elem = elem.nodeName) && "input" === elem.toLowerCase() && ("checkbox" === type || "radio" === type);
}
function trackValueOnNode(node) {
  var valueField = isCheckable(node) ? "checked" : "value", descriptor = Object.getOwnPropertyDescriptor(
    node.constructor.prototype,
    valueField
  ), currentValue = "" + node[valueField];
  if (!node.hasOwnProperty(valueField) && "undefined" !== typeof descriptor && "function" === typeof descriptor.get && "function" === typeof descriptor.set) {
    var get = descriptor.get, set = descriptor.set;
    Object.defineProperty(node, valueField, {
      configurable: true,
      get: function() {
        return get.call(this);
      },
      set: function(value) {
        currentValue = "" + value;
        set.call(this, value);
      }
    });
    Object.defineProperty(node, valueField, {
      enumerable: descriptor.enumerable
    });
    return {
      getValue: function() {
        return currentValue;
      },
      setValue: function(value) {
        currentValue = "" + value;
      },
      stopTracking: function() {
        node._valueTracker = null;
        delete node[valueField];
      }
    };
  }
}
function track(node) {
  node._valueTracker || (node._valueTracker = trackValueOnNode(node));
}
function updateValueIfChanged(node) {
  if (!node) return false;
  var tracker = node._valueTracker;
  if (!tracker) return true;
  var lastValue = tracker.getValue();
  var value = "";
  node && (value = isCheckable(node) ? node.checked ? "true" : "false" : node.value);
  node = value;
  return node !== lastValue ? (tracker.setValue(node), true) : false;
}
function getActiveElement(doc) {
  doc = doc || ("undefined" !== typeof document ? document : void 0);
  if ("undefined" === typeof doc) return null;
  try {
    return doc.activeElement || doc.body;
  } catch (e) {
    return doc.body;
  }
}
var escapeSelectorAttributeValueInsideDoubleQuotesRegex = /[\n"\\]/g;
function escapeSelectorAttributeValueInsideDoubleQuotes(value) {
  return value.replace(
    escapeSelectorAttributeValueInsideDoubleQuotesRegex,
    function(ch) {
      return "\\" + ch.charCodeAt(0).toString(16) + " ";
    }
  );
}
function updateInput(element, value, defaultValue, lastDefaultValue, checked, defaultChecked, type, name) {
  element.name = "";
  null != type && "function" !== typeof type && "symbol" !== typeof type && "boolean" !== typeof type ? element.type = type : element.removeAttribute("type");
  if (null != value)
    if ("number" === type) {
      if (0 === value && "" === element.value || element.value != value)
        element.value = "" + getToStringValue(value);
    } else
      element.value !== "" + getToStringValue(value) && (element.value = "" + getToStringValue(value));
  else
    "submit" !== type && "reset" !== type || element.removeAttribute("value");
  null != value ? setDefaultValue(element, type, getToStringValue(value)) : null != defaultValue ? setDefaultValue(element, type, getToStringValue(defaultValue)) : null != lastDefaultValue && element.removeAttribute("value");
  null == checked && null != defaultChecked && (element.defaultChecked = !!defaultChecked);
  null != checked && (element.checked = checked && "function" !== typeof checked && "symbol" !== typeof checked);
  null != name && "function" !== typeof name && "symbol" !== typeof name && "boolean" !== typeof name ? element.name = "" + getToStringValue(name) : element.removeAttribute("name");
}
function initInput(element, value, defaultValue, checked, defaultChecked, type, name, isHydrating2) {
  null != type && "function" !== typeof type && "symbol" !== typeof type && "boolean" !== typeof type && (element.type = type);
  if (null != value || null != defaultValue) {
    if (!("submit" !== type && "reset" !== type || void 0 !== value && null !== value))
      return;
    defaultValue = null != defaultValue ? "" + getToStringValue(defaultValue) : "";
    value = null != value ? "" + getToStringValue(value) : defaultValue;
    isHydrating2 || value === element.value || (element.value = value);
    element.defaultValue = value;
  }
  checked = null != checked ? checked : defaultChecked;
  checked = "function" !== typeof checked && "symbol" !== typeof checked && !!checked;
  element.checked = isHydrating2 ? element.checked : !!checked;
  element.defaultChecked = !!checked;
  null != name && "function" !== typeof name && "symbol" !== typeof name && "boolean" !== typeof name && (element.name = name);
}
function setDefaultValue(node, type, value) {
  "number" === type && getActiveElement(node.ownerDocument) === node || node.defaultValue === "" + value || (node.defaultValue = "" + value);
}
function updateOptions(node, multiple, propValue, setDefaultSelected) {
  node = node.options;
  if (multiple) {
    multiple = {};
    for (var i = 0; i < propValue.length; i++)
      multiple["$" + propValue[i]] = true;
    for (propValue = 0; propValue < node.length; propValue++)
      i = multiple.hasOwnProperty("$" + node[propValue].value), node[propValue].selected !== i && (node[propValue].selected = i), i && setDefaultSelected && (node[propValue].defaultSelected = true);
  } else {
    propValue = "" + getToStringValue(propValue);
    multiple = null;
    for (i = 0; i < node.length; i++) {
      if (node[i].value === propValue) {
        node[i].selected = true;
        setDefaultSelected && (node[i].defaultSelected = true);
        return;
      }
      null !== multiple || node[i].disabled || (multiple = node[i]);
    }
    null !== multiple && (multiple.selected = true);
  }
}
function updateTextarea(element, value, defaultValue) {
  if (null != value && (value = "" + getToStringValue(value), value !== element.value && (element.value = value), null == defaultValue)) {
    element.defaultValue !== value && (element.defaultValue = value);
    return;
  }
  element.defaultValue = null != defaultValue ? "" + getToStringValue(defaultValue) : "";
}
function initTextarea(element, value, defaultValue, children) {
  if (null == value) {
    if (null != children) {
      if (null != defaultValue) throw Error(formatProdErrorMessage(92));
      if (isArrayImpl(children)) {
        if (1 < children.length) throw Error(formatProdErrorMessage(93));
        children = children[0];
      }
      defaultValue = children;
    }
    null == defaultValue && (defaultValue = "");
    value = defaultValue;
  }
  defaultValue = getToStringValue(value);
  element.defaultValue = defaultValue;
  children = element.textContent;
  children === defaultValue && "" !== children && null !== children && (element.value = children);
}
function setTextContent(node, text) {
  if (text) {
    var firstChild = node.firstChild;
    if (firstChild && firstChild === node.lastChild && 3 === firstChild.nodeType) {
      firstChild.nodeValue = text;
      return;
    }
  }
  node.textContent = text;
}
var unitlessNumbers = new Set(
  "animationIterationCount aspectRatio borderImageOutset borderImageSlice borderImageWidth boxFlex boxFlexGroup boxOrdinalGroup columnCount columns flex flexGrow flexPositive flexShrink flexNegative flexOrder gridArea gridRow gridRowEnd gridRowSpan gridRowStart gridColumn gridColumnEnd gridColumnSpan gridColumnStart fontWeight lineClamp lineHeight opacity order orphans scale tabSize widows zIndex zoom fillOpacity floodOpacity stopOpacity strokeDasharray strokeDashoffset strokeMiterlimit strokeOpacity strokeWidth MozAnimationIterationCount MozBoxFlex MozBoxFlexGroup MozLineClamp msAnimationIterationCount msFlex msZoom msFlexGrow msFlexNegative msFlexOrder msFlexPositive msFlexShrink msGridColumn msGridColumnSpan msGridRow msGridRowSpan WebkitAnimationIterationCount WebkitBoxFlex WebKitBoxFlexGroup WebkitBoxOrdinalGroup WebkitColumnCount WebkitColumns WebkitFlex WebkitFlexGrow WebkitFlexPositive WebkitFlexShrink WebkitLineClamp".split(
    " "
  )
);
function setValueForStyle(style2, styleName, value) {
  var isCustomProperty = 0 === styleName.indexOf("--");
  null == value || "boolean" === typeof value || "" === value ? isCustomProperty ? style2.setProperty(styleName, "") : "float" === styleName ? style2.cssFloat = "" : style2[styleName] = "" : isCustomProperty ? style2.setProperty(styleName, value) : "number" !== typeof value || 0 === value || unitlessNumbers.has(styleName) ? "float" === styleName ? style2.cssFloat = value : style2[styleName] = ("" + value).trim() : style2[styleName] = value + "px";
}
function setValueForStyles(node, styles, prevStyles) {
  if (null != styles && "object" !== typeof styles)
    throw Error(formatProdErrorMessage(62));
  node = node.style;
  if (null != prevStyles) {
    for (var styleName in prevStyles)
      !prevStyles.hasOwnProperty(styleName) || null != styles && styles.hasOwnProperty(styleName) || (0 === styleName.indexOf("--") ? node.setProperty(styleName, "") : "float" === styleName ? node.cssFloat = "" : node[styleName] = "");
    for (var styleName$16 in styles)
      styleName = styles[styleName$16], styles.hasOwnProperty(styleName$16) && prevStyles[styleName$16] !== styleName && setValueForStyle(node, styleName$16, styleName);
  } else
    for (var styleName$17 in styles)
      styles.hasOwnProperty(styleName$17) && setValueForStyle(node, styleName$17, styles[styleName$17]);
}
function isCustomElement(tagName) {
  if (-1 === tagName.indexOf("-")) return false;
  switch (tagName) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return false;
    default:
      return true;
  }
}
var aliases = /* @__PURE__ */ new Map([
  ["acceptCharset", "accept-charset"],
  ["htmlFor", "for"],
  ["httpEquiv", "http-equiv"],
  ["crossOrigin", "crossorigin"],
  ["accentHeight", "accent-height"],
  ["alignmentBaseline", "alignment-baseline"],
  ["arabicForm", "arabic-form"],
  ["baselineShift", "baseline-shift"],
  ["capHeight", "cap-height"],
  ["clipPath", "clip-path"],
  ["clipRule", "clip-rule"],
  ["colorInterpolation", "color-interpolation"],
  ["colorInterpolationFilters", "color-interpolation-filters"],
  ["colorProfile", "color-profile"],
  ["colorRendering", "color-rendering"],
  ["dominantBaseline", "dominant-baseline"],
  ["enableBackground", "enable-background"],
  ["fillOpacity", "fill-opacity"],
  ["fillRule", "fill-rule"],
  ["floodColor", "flood-color"],
  ["floodOpacity", "flood-opacity"],
  ["fontFamily", "font-family"],
  ["fontSize", "font-size"],
  ["fontSizeAdjust", "font-size-adjust"],
  ["fontStretch", "font-stretch"],
  ["fontStyle", "font-style"],
  ["fontVariant", "font-variant"],
  ["fontWeight", "font-weight"],
  ["glyphName", "glyph-name"],
  ["glyphOrientationHorizontal", "glyph-orientation-horizontal"],
  ["glyphOrientationVertical", "glyph-orientation-vertical"],
  ["horizAdvX", "horiz-adv-x"],
  ["horizOriginX", "horiz-origin-x"],
  ["imageRendering", "image-rendering"],
  ["letterSpacing", "letter-spacing"],
  ["lightingColor", "lighting-color"],
  ["markerEnd", "marker-end"],
  ["markerMid", "marker-mid"],
  ["markerStart", "marker-start"],
  ["overlinePosition", "overline-position"],
  ["overlineThickness", "overline-thickness"],
  ["paintOrder", "paint-order"],
  ["panose-1", "panose-1"],
  ["pointerEvents", "pointer-events"],
  ["renderingIntent", "rendering-intent"],
  ["shapeRendering", "shape-rendering"],
  ["stopColor", "stop-color"],
  ["stopOpacity", "stop-opacity"],
  ["strikethroughPosition", "strikethrough-position"],
  ["strikethroughThickness", "strikethrough-thickness"],
  ["strokeDasharray", "stroke-dasharray"],
  ["strokeDashoffset", "stroke-dashoffset"],
  ["strokeLinecap", "stroke-linecap"],
  ["strokeLinejoin", "stroke-linejoin"],
  ["strokeMiterlimit", "stroke-miterlimit"],
  ["strokeOpacity", "stroke-opacity"],
  ["strokeWidth", "stroke-width"],
  ["textAnchor", "text-anchor"],
  ["textDecoration", "text-decoration"],
  ["textRendering", "text-rendering"],
  ["transformOrigin", "transform-origin"],
  ["underlinePosition", "underline-position"],
  ["underlineThickness", "underline-thickness"],
  ["unicodeBidi", "unicode-bidi"],
  ["unicodeRange", "unicode-range"],
  ["unitsPerEm", "units-per-em"],
  ["vAlphabetic", "v-alphabetic"],
  ["vHanging", "v-hanging"],
  ["vIdeographic", "v-ideographic"],
  ["vMathematical", "v-mathematical"],
  ["vectorEffect", "vector-effect"],
  ["vertAdvY", "vert-adv-y"],
  ["vertOriginX", "vert-origin-x"],
  ["vertOriginY", "vert-origin-y"],
  ["wordSpacing", "word-spacing"],
  ["writingMode", "writing-mode"],
  ["xmlnsXlink", "xmlns:xlink"],
  ["xHeight", "x-height"]
]), isJavaScriptProtocol = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*:/i;
function sanitizeURL(url) {
  return isJavaScriptProtocol.test("" + url) ? "javascript:throw new Error('React has blocked a javascript: URL as a security precaution.')" : url;
}
var currentReplayingEvent = null;
function getEventTarget(nativeEvent) {
  nativeEvent = nativeEvent.target || nativeEvent.srcElement || window;
  nativeEvent.correspondingUseElement && (nativeEvent = nativeEvent.correspondingUseElement);
  return 3 === nativeEvent.nodeType ? nativeEvent.parentNode : nativeEvent;
}
var restoreTarget = null, restoreQueue = null;
function restoreStateOfTarget(target) {
  var internalInstance = getInstanceFromNode(target);
  if (internalInstance && (target = internalInstance.stateNode)) {
    var props = target[internalPropsKey] || null;
    a: switch (target = internalInstance.stateNode, internalInstance.type) {
      case "input":
        updateInput(
          target,
          props.value,
          props.defaultValue,
          props.defaultValue,
          props.checked,
          props.defaultChecked,
          props.type,
          props.name
        );
        internalInstance = props.name;
        if ("radio" === props.type && null != internalInstance) {
          for (props = target; props.parentNode; ) props = props.parentNode;
          props = props.querySelectorAll(
            'input[name="' + escapeSelectorAttributeValueInsideDoubleQuotes(
              "" + internalInstance
            ) + '"][type="radio"]'
          );
          for (internalInstance = 0; internalInstance < props.length; internalInstance++) {
            var otherNode = props[internalInstance];
            if (otherNode !== target && otherNode.form === target.form) {
              var otherProps = otherNode[internalPropsKey] || null;
              if (!otherProps) throw Error(formatProdErrorMessage(90));
              updateInput(
                otherNode,
                otherProps.value,
                otherProps.defaultValue,
                otherProps.defaultValue,
                otherProps.checked,
                otherProps.defaultChecked,
                otherProps.type,
                otherProps.name
              );
            }
          }
          for (internalInstance = 0; internalInstance < props.length; internalInstance++)
            otherNode = props[internalInstance], otherNode.form === target.form && updateValueIfChanged(otherNode);
        }
        break a;
      case "textarea":
        updateTextarea(target, props.value, props.defaultValue);
        break a;
      case "select":
        internalInstance = props.value, null != internalInstance && updateOptions(target, !!props.multiple, internalInstance, false);
    }
  }
}
var isInsideEventHandler = false;
function batchedUpdates$1(fn, a, b) {
  if (isInsideEventHandler) return fn(a, b);
  isInsideEventHandler = true;
  try {
    var JSCompiler_inline_result = fn(a);
    return JSCompiler_inline_result;
  } finally {
    if (isInsideEventHandler = false, null !== restoreTarget || null !== restoreQueue) {
      if (flushSyncWork$1(), restoreTarget && (a = restoreTarget, fn = restoreQueue, restoreQueue = restoreTarget = null, restoreStateOfTarget(a), fn))
        for (a = 0; a < fn.length; a++) restoreStateOfTarget(fn[a]);
    }
  }
}
function getListener(inst, registrationName) {
  var stateNode = inst.stateNode;
  if (null === stateNode) return null;
  var props = stateNode[internalPropsKey] || null;
  if (null === props) return null;
  stateNode = props[registrationName];
  a: switch (registrationName) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (props = !props.disabled) || (inst = inst.type, props = !("button" === inst || "input" === inst || "select" === inst || "textarea" === inst));
      inst = !props;
      break a;
    default:
      inst = false;
  }
  if (inst) return null;
  if (stateNode && "function" !== typeof stateNode)
    throw Error(
      formatProdErrorMessage(231, registrationName, typeof stateNode)
    );
  return stateNode;
}
var passiveBrowserEventsSupported = false;
if (canUseDOM)
  try {
    var options$1 = {};
    Object.defineProperty(options$1, "passive", {
      get: function() {
        passiveBrowserEventsSupported = true;
      }
    });
    window.addEventListener("test", options$1, options$1);
    window.removeEventListener("test", options$1, options$1);
  } catch (e) {
    passiveBrowserEventsSupported = false;
  }
var root = null, startText = null, fallbackText = null;
function getData() {
  if (fallbackText) return fallbackText;
  var start, startValue = startText, startLength = startValue.length, end, endValue = "value" in root ? root.value : root.textContent, endLength = endValue.length;
  for (start = 0; start < startLength && startValue[start] === endValue[start]; start++) ;
  var minEnd = startLength - start;
  for (end = 1; end <= minEnd && startValue[startLength - end] === endValue[endLength - end]; end++) ;
  return fallbackText = endValue.slice(start, 1 < end ? 1 - end : void 0);
}
function getEventCharCode(nativeEvent) {
  var keyCode = nativeEvent.keyCode;
  "charCode" in nativeEvent ? (nativeEvent = nativeEvent.charCode, 0 === nativeEvent && 13 === keyCode && (nativeEvent = 13)) : nativeEvent = keyCode;
  10 === nativeEvent && (nativeEvent = 13);
  return 32 <= nativeEvent || 13 === nativeEvent ? nativeEvent : 0;
}
function functionThatReturnsTrue() {
  return true;
}
function functionThatReturnsFalse() {
  return false;
}
function createSyntheticEvent(Interface) {
  function SyntheticBaseEvent(reactName, reactEventType, targetInst, nativeEvent, nativeEventTarget) {
    this._reactName = reactName;
    this._targetInst = targetInst;
    this.type = reactEventType;
    this.nativeEvent = nativeEvent;
    this.target = nativeEventTarget;
    this.currentTarget = null;
    for (var propName in Interface)
      Interface.hasOwnProperty(propName) && (reactName = Interface[propName], this[propName] = reactName ? reactName(nativeEvent) : nativeEvent[propName]);
    this.isDefaultPrevented = (null != nativeEvent.defaultPrevented ? nativeEvent.defaultPrevented : false === nativeEvent.returnValue) ? functionThatReturnsTrue : functionThatReturnsFalse;
    this.isPropagationStopped = functionThatReturnsFalse;
    return this;
  }
  assign(SyntheticBaseEvent.prototype, {
    preventDefault: function() {
      this.defaultPrevented = true;
      var event = this.nativeEvent;
      event && (event.preventDefault ? event.preventDefault() : "unknown" !== typeof event.returnValue && (event.returnValue = false), this.isDefaultPrevented = functionThatReturnsTrue);
    },
    stopPropagation: function() {
      var event = this.nativeEvent;
      event && (event.stopPropagation ? event.stopPropagation() : "unknown" !== typeof event.cancelBubble && (event.cancelBubble = true), this.isPropagationStopped = functionThatReturnsTrue);
    },
    persist: function() {
    },
    isPersistent: functionThatReturnsTrue
  });
  return SyntheticBaseEvent;
}
var EventInterface = {
  eventPhase: 0,
  bubbles: 0,
  cancelable: 0,
  timeStamp: function(event) {
    return event.timeStamp || Date.now();
  },
  defaultPrevented: 0,
  isTrusted: 0
}, SyntheticEvent = createSyntheticEvent(EventInterface), UIEventInterface = assign({}, EventInterface, { view: 0, detail: 0 }), SyntheticUIEvent = createSyntheticEvent(UIEventInterface), lastMovementX, lastMovementY, lastMouseEvent, MouseEventInterface = assign({}, UIEventInterface, {
  screenX: 0,
  screenY: 0,
  clientX: 0,
  clientY: 0,
  pageX: 0,
  pageY: 0,
  ctrlKey: 0,
  shiftKey: 0,
  altKey: 0,
  metaKey: 0,
  getModifierState: getEventModifierState,
  button: 0,
  buttons: 0,
  relatedTarget: function(event) {
    return void 0 === event.relatedTarget ? event.fromElement === event.srcElement ? event.toElement : event.fromElement : event.relatedTarget;
  },
  movementX: function(event) {
    if ("movementX" in event) return event.movementX;
    event !== lastMouseEvent && (lastMouseEvent && "mousemove" === event.type ? (lastMovementX = event.screenX - lastMouseEvent.screenX, lastMovementY = event.screenY - lastMouseEvent.screenY) : lastMovementY = lastMovementX = 0, lastMouseEvent = event);
    return lastMovementX;
  },
  movementY: function(event) {
    return "movementY" in event ? event.movementY : lastMovementY;
  }
}), SyntheticMouseEvent = createSyntheticEvent(MouseEventInterface), DragEventInterface = assign({}, MouseEventInterface, { dataTransfer: 0 }), SyntheticDragEvent = createSyntheticEvent(DragEventInterface), FocusEventInterface = assign({}, UIEventInterface, { relatedTarget: 0 }), SyntheticFocusEvent = createSyntheticEvent(FocusEventInterface), AnimationEventInterface = assign({}, EventInterface, {
  animationName: 0,
  elapsedTime: 0,
  pseudoElement: 0
}), SyntheticAnimationEvent = createSyntheticEvent(AnimationEventInterface), ClipboardEventInterface = assign({}, EventInterface, {
  clipboardData: function(event) {
    return "clipboardData" in event ? event.clipboardData : window.clipboardData;
  }
}), SyntheticClipboardEvent = createSyntheticEvent(ClipboardEventInterface), CompositionEventInterface = assign({}, EventInterface, { data: 0 }), SyntheticCompositionEvent = createSyntheticEvent(CompositionEventInterface), normalizeKey = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, translateToKey = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, modifierKeyToProp = {
  Alt: "altKey",
  Control: "ctrlKey",
  Meta: "metaKey",
  Shift: "shiftKey"
};
function modifierStateGetter(keyArg) {
  var nativeEvent = this.nativeEvent;
  return nativeEvent.getModifierState ? nativeEvent.getModifierState(keyArg) : (keyArg = modifierKeyToProp[keyArg]) ? !!nativeEvent[keyArg] : false;
}
function getEventModifierState() {
  return modifierStateGetter;
}
var KeyboardEventInterface = assign({}, UIEventInterface, {
  key: function(nativeEvent) {
    if (nativeEvent.key) {
      var key = normalizeKey[nativeEvent.key] || nativeEvent.key;
      if ("Unidentified" !== key) return key;
    }
    return "keypress" === nativeEvent.type ? (nativeEvent = getEventCharCode(nativeEvent), 13 === nativeEvent ? "Enter" : String.fromCharCode(nativeEvent)) : "keydown" === nativeEvent.type || "keyup" === nativeEvent.type ? translateToKey[nativeEvent.keyCode] || "Unidentified" : "";
  },
  code: 0,
  location: 0,
  ctrlKey: 0,
  shiftKey: 0,
  altKey: 0,
  metaKey: 0,
  repeat: 0,
  locale: 0,
  getModifierState: getEventModifierState,
  charCode: function(event) {
    return "keypress" === event.type ? getEventCharCode(event) : 0;
  },
  keyCode: function(event) {
    return "keydown" === event.type || "keyup" === event.type ? event.keyCode : 0;
  },
  which: function(event) {
    return "keypress" === event.type ? getEventCharCode(event) : "keydown" === event.type || "keyup" === event.type ? event.keyCode : 0;
  }
}), SyntheticKeyboardEvent = createSyntheticEvent(KeyboardEventInterface), PointerEventInterface = assign({}, MouseEventInterface, {
  pointerId: 0,
  width: 0,
  height: 0,
  pressure: 0,
  tangentialPressure: 0,
  tiltX: 0,
  tiltY: 0,
  twist: 0,
  pointerType: 0,
  isPrimary: 0
}), SyntheticPointerEvent = createSyntheticEvent(PointerEventInterface), TouchEventInterface = assign({}, UIEventInterface, {
  touches: 0,
  targetTouches: 0,
  changedTouches: 0,
  altKey: 0,
  metaKey: 0,
  ctrlKey: 0,
  shiftKey: 0,
  getModifierState: getEventModifierState
}), SyntheticTouchEvent = createSyntheticEvent(TouchEventInterface), TransitionEventInterface = assign({}, EventInterface, {
  propertyName: 0,
  elapsedTime: 0,
  pseudoElement: 0
}), SyntheticTransitionEvent = createSyntheticEvent(TransitionEventInterface), WheelEventInterface = assign({}, MouseEventInterface, {
  deltaX: function(event) {
    return "deltaX" in event ? event.deltaX : "wheelDeltaX" in event ? -event.wheelDeltaX : 0;
  },
  deltaY: function(event) {
    return "deltaY" in event ? event.deltaY : "wheelDeltaY" in event ? -event.wheelDeltaY : "wheelDelta" in event ? -event.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), SyntheticWheelEvent = createSyntheticEvent(WheelEventInterface), ToggleEventInterface = assign({}, EventInterface, {
  newState: 0,
  oldState: 0
}), SyntheticToggleEvent = createSyntheticEvent(ToggleEventInterface), END_KEYCODES = [9, 13, 27, 32], canUseCompositionEvent = canUseDOM && "CompositionEvent" in window, documentMode = null;
canUseDOM && "documentMode" in document && (documentMode = document.documentMode);
var canUseTextInputEvent = canUseDOM && "TextEvent" in window && !documentMode, useFallbackCompositionData = canUseDOM && (!canUseCompositionEvent || documentMode && 8 < documentMode && 11 >= documentMode), SPACEBAR_CHAR = String.fromCharCode(32), hasSpaceKeypress = false;
function isFallbackCompositionEnd(domEventName, nativeEvent) {
  switch (domEventName) {
    case "keyup":
      return -1 !== END_KEYCODES.indexOf(nativeEvent.keyCode);
    case "keydown":
      return 229 !== nativeEvent.keyCode;
    case "keypress":
    case "mousedown":
    case "focusout":
      return true;
    default:
      return false;
  }
}
function getDataFromCustomEvent(nativeEvent) {
  nativeEvent = nativeEvent.detail;
  return "object" === typeof nativeEvent && "data" in nativeEvent ? nativeEvent.data : null;
}
var isComposing = false;
function getNativeBeforeInputChars(domEventName, nativeEvent) {
  switch (domEventName) {
    case "compositionend":
      return getDataFromCustomEvent(nativeEvent);
    case "keypress":
      if (32 !== nativeEvent.which) return null;
      hasSpaceKeypress = true;
      return SPACEBAR_CHAR;
    case "textInput":
      return domEventName = nativeEvent.data, domEventName === SPACEBAR_CHAR && hasSpaceKeypress ? null : domEventName;
    default:
      return null;
  }
}
function getFallbackBeforeInputChars(domEventName, nativeEvent) {
  if (isComposing)
    return "compositionend" === domEventName || !canUseCompositionEvent && isFallbackCompositionEnd(domEventName, nativeEvent) ? (domEventName = getData(), fallbackText = startText = root = null, isComposing = false, domEventName) : null;
  switch (domEventName) {
    case "paste":
      return null;
    case "keypress":
      if (!(nativeEvent.ctrlKey || nativeEvent.altKey || nativeEvent.metaKey) || nativeEvent.ctrlKey && nativeEvent.altKey) {
        if (nativeEvent.char && 1 < nativeEvent.char.length)
          return nativeEvent.char;
        if (nativeEvent.which) return String.fromCharCode(nativeEvent.which);
      }
      return null;
    case "compositionend":
      return useFallbackCompositionData && "ko" !== nativeEvent.locale ? null : nativeEvent.data;
    default:
      return null;
  }
}
var supportedInputTypes = {
  color: true,
  date: true,
  datetime: true,
  "datetime-local": true,
  email: true,
  month: true,
  number: true,
  password: true,
  range: true,
  search: true,
  tel: true,
  text: true,
  time: true,
  url: true,
  week: true
};
function isTextInputElement(elem) {
  var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
  return "input" === nodeName ? !!supportedInputTypes[elem.type] : "textarea" === nodeName ? true : false;
}
function createAndAccumulateChangeEvent(dispatchQueue, inst, nativeEvent, target) {
  restoreTarget ? restoreQueue ? restoreQueue.push(target) : restoreQueue = [target] : restoreTarget = target;
  inst = accumulateTwoPhaseListeners(inst, "onChange");
  0 < inst.length && (nativeEvent = new SyntheticEvent(
    "onChange",
    "change",
    null,
    nativeEvent,
    target
  ), dispatchQueue.push({ event: nativeEvent, listeners: inst }));
}
var activeElement$1 = null, activeElementInst$1 = null;
function runEventInBatch(dispatchQueue) {
  processDispatchQueue(dispatchQueue, 0);
}
function getInstIfValueChanged(targetInst) {
  var targetNode = getNodeFromInstance(targetInst);
  if (updateValueIfChanged(targetNode)) return targetInst;
}
function getTargetInstForChangeEvent(domEventName, targetInst) {
  if ("change" === domEventName) return targetInst;
}
var isInputEventSupported = false;
if (canUseDOM) {
  var JSCompiler_inline_result$jscomp$283;
  if (canUseDOM) {
    var isSupported$jscomp$inline_418 = "oninput" in document;
    if (!isSupported$jscomp$inline_418) {
      var element$jscomp$inline_419 = document.createElement("div");
      element$jscomp$inline_419.setAttribute("oninput", "return;");
      isSupported$jscomp$inline_418 = "function" === typeof element$jscomp$inline_419.oninput;
    }
    JSCompiler_inline_result$jscomp$283 = isSupported$jscomp$inline_418;
  } else JSCompiler_inline_result$jscomp$283 = false;
  isInputEventSupported = JSCompiler_inline_result$jscomp$283 && (!document.documentMode || 9 < document.documentMode);
}
function stopWatchingForValueChange() {
  activeElement$1 && (activeElement$1.detachEvent("onpropertychange", handlePropertyChange), activeElementInst$1 = activeElement$1 = null);
}
function handlePropertyChange(nativeEvent) {
  if ("value" === nativeEvent.propertyName && getInstIfValueChanged(activeElementInst$1)) {
    var dispatchQueue = [];
    createAndAccumulateChangeEvent(
      dispatchQueue,
      activeElementInst$1,
      nativeEvent,
      getEventTarget(nativeEvent)
    );
    batchedUpdates$1(runEventInBatch, dispatchQueue);
  }
}
function handleEventsForInputEventPolyfill(domEventName, target, targetInst) {
  "focusin" === domEventName ? (stopWatchingForValueChange(), activeElement$1 = target, activeElementInst$1 = targetInst, activeElement$1.attachEvent("onpropertychange", handlePropertyChange)) : "focusout" === domEventName && stopWatchingForValueChange();
}
function getTargetInstForInputEventPolyfill(domEventName) {
  if ("selectionchange" === domEventName || "keyup" === domEventName || "keydown" === domEventName)
    return getInstIfValueChanged(activeElementInst$1);
}
function getTargetInstForClickEvent(domEventName, targetInst) {
  if ("click" === domEventName) return getInstIfValueChanged(targetInst);
}
function getTargetInstForInputOrChangeEvent(domEventName, targetInst) {
  if ("input" === domEventName || "change" === domEventName)
    return getInstIfValueChanged(targetInst);
}
function is(x, y) {
  return x === y && (0 !== x || 1 / x === 1 / y) || x !== x && y !== y;
}
var objectIs = "function" === typeof Object.is ? Object.is : is;
function shallowEqual(objA, objB) {
  if (objectIs(objA, objB)) return true;
  if ("object" !== typeof objA || null === objA || "object" !== typeof objB || null === objB)
    return false;
  var keysA = Object.keys(objA), keysB = Object.keys(objB);
  if (keysA.length !== keysB.length) return false;
  for (keysB = 0; keysB < keysA.length; keysB++) {
    var currentKey = keysA[keysB];
    if (!hasOwnProperty.call(objB, currentKey) || !objectIs(objA[currentKey], objB[currentKey]))
      return false;
  }
  return true;
}
function getLeafNode(node) {
  for (; node && node.firstChild; ) node = node.firstChild;
  return node;
}
function getNodeForCharacterOffset(root2, offset) {
  var node = getLeafNode(root2);
  root2 = 0;
  for (var nodeEnd; node; ) {
    if (3 === node.nodeType) {
      nodeEnd = root2 + node.textContent.length;
      if (root2 <= offset && nodeEnd >= offset)
        return { node, offset: offset - root2 };
      root2 = nodeEnd;
    }
    a: {
      for (; node; ) {
        if (node.nextSibling) {
          node = node.nextSibling;
          break a;
        }
        node = node.parentNode;
      }
      node = void 0;
    }
    node = getLeafNode(node);
  }
}
function containsNode(outerNode, innerNode) {
  return outerNode && innerNode ? outerNode === innerNode ? true : outerNode && 3 === outerNode.nodeType ? false : innerNode && 3 === innerNode.nodeType ? containsNode(outerNode, innerNode.parentNode) : "contains" in outerNode ? outerNode.contains(innerNode) : outerNode.compareDocumentPosition ? !!(outerNode.compareDocumentPosition(innerNode) & 16) : false : false;
}
function getActiveElementDeep(containerInfo) {
  containerInfo = null != containerInfo && null != containerInfo.ownerDocument && null != containerInfo.ownerDocument.defaultView ? containerInfo.ownerDocument.defaultView : window;
  for (var element = getActiveElement(containerInfo.document); element instanceof containerInfo.HTMLIFrameElement; ) {
    try {
      var JSCompiler_inline_result = "string" === typeof element.contentWindow.location.href;
    } catch (err) {
      JSCompiler_inline_result = false;
    }
    if (JSCompiler_inline_result) containerInfo = element.contentWindow;
    else break;
    element = getActiveElement(containerInfo.document);
  }
  return element;
}
function hasSelectionCapabilities(elem) {
  var nodeName = elem && elem.nodeName && elem.nodeName.toLowerCase();
  return nodeName && ("input" === nodeName && ("text" === elem.type || "search" === elem.type || "tel" === elem.type || "url" === elem.type || "password" === elem.type) || "textarea" === nodeName || "true" === elem.contentEditable);
}
function restoreSelection(priorSelectionInformation, containerInfo) {
  var curFocusedElem = getActiveElementDeep(containerInfo);
  containerInfo = priorSelectionInformation.focusedElem;
  var priorSelectionRange = priorSelectionInformation.selectionRange;
  if (curFocusedElem !== containerInfo && containerInfo && containerInfo.ownerDocument && containsNode(containerInfo.ownerDocument.documentElement, containerInfo)) {
    if (null !== priorSelectionRange && hasSelectionCapabilities(containerInfo)) {
      if (priorSelectionInformation = priorSelectionRange.start, curFocusedElem = priorSelectionRange.end, void 0 === curFocusedElem && (curFocusedElem = priorSelectionInformation), "selectionStart" in containerInfo)
        containerInfo.selectionStart = priorSelectionInformation, containerInfo.selectionEnd = Math.min(
          curFocusedElem,
          containerInfo.value.length
        );
      else if (curFocusedElem = (priorSelectionInformation = containerInfo.ownerDocument || document) && priorSelectionInformation.defaultView || window, curFocusedElem.getSelection) {
        curFocusedElem = curFocusedElem.getSelection();
        var length = containerInfo.textContent.length, start = Math.min(priorSelectionRange.start, length);
        priorSelectionRange = void 0 === priorSelectionRange.end ? start : Math.min(priorSelectionRange.end, length);
        !curFocusedElem.extend && start > priorSelectionRange && (length = priorSelectionRange, priorSelectionRange = start, start = length);
        length = getNodeForCharacterOffset(containerInfo, start);
        var endMarker = getNodeForCharacterOffset(
          containerInfo,
          priorSelectionRange
        );
        length && endMarker && (1 !== curFocusedElem.rangeCount || curFocusedElem.anchorNode !== length.node || curFocusedElem.anchorOffset !== length.offset || curFocusedElem.focusNode !== endMarker.node || curFocusedElem.focusOffset !== endMarker.offset) && (priorSelectionInformation = priorSelectionInformation.createRange(), priorSelectionInformation.setStart(length.node, length.offset), curFocusedElem.removeAllRanges(), start > priorSelectionRange ? (curFocusedElem.addRange(priorSelectionInformation), curFocusedElem.extend(endMarker.node, endMarker.offset)) : (priorSelectionInformation.setEnd(
          endMarker.node,
          endMarker.offset
        ), curFocusedElem.addRange(priorSelectionInformation)));
      }
    }
    priorSelectionInformation = [];
    for (curFocusedElem = containerInfo; curFocusedElem = curFocusedElem.parentNode; )
      1 === curFocusedElem.nodeType && priorSelectionInformation.push({
        element: curFocusedElem,
        left: curFocusedElem.scrollLeft,
        top: curFocusedElem.scrollTop
      });
    "function" === typeof containerInfo.focus && containerInfo.focus();
    for (containerInfo = 0; containerInfo < priorSelectionInformation.length; containerInfo++)
      curFocusedElem = priorSelectionInformation[containerInfo], curFocusedElem.element.scrollLeft = curFocusedElem.left, curFocusedElem.element.scrollTop = curFocusedElem.top;
  }
}
var skipSelectionChangeEvent = canUseDOM && "documentMode" in document && 11 >= document.documentMode, activeElement = null, activeElementInst = null, lastSelection = null, mouseDown = false;
function constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget) {
  var doc = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget.document : 9 === nativeEventTarget.nodeType ? nativeEventTarget : nativeEventTarget.ownerDocument;
  mouseDown || null == activeElement || activeElement !== getActiveElement(doc) || (doc = activeElement, "selectionStart" in doc && hasSelectionCapabilities(doc) ? doc = { start: doc.selectionStart, end: doc.selectionEnd } : (doc = (doc.ownerDocument && doc.ownerDocument.defaultView || window).getSelection(), doc = {
    anchorNode: doc.anchorNode,
    anchorOffset: doc.anchorOffset,
    focusNode: doc.focusNode,
    focusOffset: doc.focusOffset
  }), lastSelection && shallowEqual(lastSelection, doc) || (lastSelection = doc, doc = accumulateTwoPhaseListeners(activeElementInst, "onSelect"), 0 < doc.length && (nativeEvent = new SyntheticEvent(
    "onSelect",
    "select",
    null,
    nativeEvent,
    nativeEventTarget
  ), dispatchQueue.push({ event: nativeEvent, listeners: doc }), nativeEvent.target = activeElement)));
}
function makePrefixMap(styleProp, eventName) {
  var prefixes = {};
  prefixes[styleProp.toLowerCase()] = eventName.toLowerCase();
  prefixes["Webkit" + styleProp] = "webkit" + eventName;
  prefixes["Moz" + styleProp] = "moz" + eventName;
  return prefixes;
}
var vendorPrefixes = {
  animationend: makePrefixMap("Animation", "AnimationEnd"),
  animationiteration: makePrefixMap("Animation", "AnimationIteration"),
  animationstart: makePrefixMap("Animation", "AnimationStart"),
  transitionrun: makePrefixMap("Transition", "TransitionRun"),
  transitionstart: makePrefixMap("Transition", "TransitionStart"),
  transitioncancel: makePrefixMap("Transition", "TransitionCancel"),
  transitionend: makePrefixMap("Transition", "TransitionEnd")
}, prefixedEventNames = {}, style = {};
canUseDOM && (style = document.createElement("div").style, "AnimationEvent" in window || (delete vendorPrefixes.animationend.animation, delete vendorPrefixes.animationiteration.animation, delete vendorPrefixes.animationstart.animation), "TransitionEvent" in window || delete vendorPrefixes.transitionend.transition);
function getVendorPrefixedEventName(eventName) {
  if (prefixedEventNames[eventName]) return prefixedEventNames[eventName];
  if (!vendorPrefixes[eventName]) return eventName;
  var prefixMap = vendorPrefixes[eventName], styleProp;
  for (styleProp in prefixMap)
    if (prefixMap.hasOwnProperty(styleProp) && styleProp in style)
      return prefixedEventNames[eventName] = prefixMap[styleProp];
  return eventName;
}
var ANIMATION_END = getVendorPrefixedEventName("animationend"), ANIMATION_ITERATION = getVendorPrefixedEventName("animationiteration"), ANIMATION_START = getVendorPrefixedEventName("animationstart"), TRANSITION_RUN = getVendorPrefixedEventName("transitionrun"), TRANSITION_START = getVendorPrefixedEventName("transitionstart"), TRANSITION_CANCEL = getVendorPrefixedEventName("transitioncancel"), TRANSITION_END = getVendorPrefixedEventName("transitionend"), topLevelEventsToReactNames = /* @__PURE__ */ new Map(), simpleEventPluginEvents = "abort auxClick beforeToggle cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll scrollEnd toggle touchMove waiting wheel".split(
  " "
);
function registerSimpleEvent(domEventName, reactName) {
  topLevelEventsToReactNames.set(domEventName, reactName);
  registerTwoPhaseEvent(reactName, [domEventName]);
}
var concurrentQueues = [], concurrentQueuesIndex = 0, concurrentlyUpdatedLanes = 0;
function finishQueueingConcurrentUpdates() {
  for (var endIndex = concurrentQueuesIndex, i = concurrentlyUpdatedLanes = concurrentQueuesIndex = 0; i < endIndex; ) {
    var fiber = concurrentQueues[i];
    concurrentQueues[i++] = null;
    var queue = concurrentQueues[i];
    concurrentQueues[i++] = null;
    var update = concurrentQueues[i];
    concurrentQueues[i++] = null;
    var lane = concurrentQueues[i];
    concurrentQueues[i++] = null;
    if (null !== queue && null !== update) {
      var pending = queue.pending;
      null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
      queue.pending = update;
    }
    0 !== lane && markUpdateLaneFromFiberToRoot(fiber, update, lane);
  }
}
function enqueueUpdate$1(fiber, queue, update, lane) {
  concurrentQueues[concurrentQueuesIndex++] = fiber;
  concurrentQueues[concurrentQueuesIndex++] = queue;
  concurrentQueues[concurrentQueuesIndex++] = update;
  concurrentQueues[concurrentQueuesIndex++] = lane;
  concurrentlyUpdatedLanes |= lane;
  fiber.lanes |= lane;
  fiber = fiber.alternate;
  null !== fiber && (fiber.lanes |= lane);
}
function enqueueConcurrentHookUpdate(fiber, queue, update, lane) {
  enqueueUpdate$1(fiber, queue, update, lane);
  return getRootForUpdatedFiber(fiber);
}
function enqueueConcurrentRenderForLane(fiber, lane) {
  enqueueUpdate$1(fiber, null, null, lane);
  return getRootForUpdatedFiber(fiber);
}
function markUpdateLaneFromFiberToRoot(sourceFiber, update, lane) {
  sourceFiber.lanes |= lane;
  var alternate = sourceFiber.alternate;
  null !== alternate && (alternate.lanes |= lane);
  for (var isHidden = false, parent = sourceFiber.return; null !== parent; )
    parent.childLanes |= lane, alternate = parent.alternate, null !== alternate && (alternate.childLanes |= lane), 22 === parent.tag && (sourceFiber = parent.stateNode, null === sourceFiber || sourceFiber._visibility & 1 || (isHidden = true)), sourceFiber = parent, parent = parent.return;
  isHidden && null !== update && 3 === sourceFiber.tag && (parent = sourceFiber.stateNode, isHidden = 31 - clz32(lane), parent = parent.hiddenUpdates, sourceFiber = parent[isHidden], null === sourceFiber ? parent[isHidden] = [update] : sourceFiber.push(update), update.lane = lane | 536870912);
}
function getRootForUpdatedFiber(sourceFiber) {
  if (50 < nestedUpdateCount)
    throw nestedUpdateCount = 0, rootWithNestedUpdates = null, Error(formatProdErrorMessage(185));
  for (var parent = sourceFiber.return; null !== parent; )
    sourceFiber = parent, parent = sourceFiber.return;
  return 3 === sourceFiber.tag ? sourceFiber.stateNode : null;
}
var emptyContextObject = {}, CapturedStacks = /* @__PURE__ */ new WeakMap();
function createCapturedValueAtFiber(value, source) {
  if ("object" === typeof value && null !== value) {
    var existing = CapturedStacks.get(value);
    if (void 0 !== existing) return existing;
    source = {
      value,
      source,
      stack: getStackByFiberInDevAndProd(source)
    };
    CapturedStacks.set(value, source);
    return source;
  }
  return {
    value,
    source,
    stack: getStackByFiberInDevAndProd(source)
  };
}
var forkStack = [], forkStackIndex = 0, treeForkProvider = null, treeForkCount = 0, idStack = [], idStackIndex = 0, treeContextProvider = null, treeContextId = 1, treeContextOverflow = "";
function pushTreeFork(workInProgress2, totalChildren) {
  forkStack[forkStackIndex++] = treeForkCount;
  forkStack[forkStackIndex++] = treeForkProvider;
  treeForkProvider = workInProgress2;
  treeForkCount = totalChildren;
}
function pushTreeId(workInProgress2, totalChildren, index2) {
  idStack[idStackIndex++] = treeContextId;
  idStack[idStackIndex++] = treeContextOverflow;
  idStack[idStackIndex++] = treeContextProvider;
  treeContextProvider = workInProgress2;
  var baseIdWithLeadingBit = treeContextId;
  workInProgress2 = treeContextOverflow;
  var baseLength = 32 - clz32(baseIdWithLeadingBit) - 1;
  baseIdWithLeadingBit &= ~(1 << baseLength);
  index2 += 1;
  var length = 32 - clz32(totalChildren) + baseLength;
  if (30 < length) {
    var numberOfOverflowBits = baseLength - baseLength % 5;
    length = (baseIdWithLeadingBit & (1 << numberOfOverflowBits) - 1).toString(32);
    baseIdWithLeadingBit >>= numberOfOverflowBits;
    baseLength -= numberOfOverflowBits;
    treeContextId = 1 << 32 - clz32(totalChildren) + baseLength | index2 << baseLength | baseIdWithLeadingBit;
    treeContextOverflow = length + workInProgress2;
  } else
    treeContextId = 1 << length | index2 << baseLength | baseIdWithLeadingBit, treeContextOverflow = workInProgress2;
}
function pushMaterializedTreeId(workInProgress2) {
  null !== workInProgress2.return && (pushTreeFork(workInProgress2, 1), pushTreeId(workInProgress2, 1, 0));
}
function popTreeContext(workInProgress2) {
  for (; workInProgress2 === treeForkProvider; )
    treeForkProvider = forkStack[--forkStackIndex], forkStack[forkStackIndex] = null, treeForkCount = forkStack[--forkStackIndex], forkStack[forkStackIndex] = null;
  for (; workInProgress2 === treeContextProvider; )
    treeContextProvider = idStack[--idStackIndex], idStack[idStackIndex] = null, treeContextOverflow = idStack[--idStackIndex], idStack[idStackIndex] = null, treeContextId = idStack[--idStackIndex], idStack[idStackIndex] = null;
}
var hydrationParentFiber = null, nextHydratableInstance = null, isHydrating = false, hydrationErrors = null, rootOrSingletonContext = false, HydrationMismatchException = Error(formatProdErrorMessage(519));
function throwOnHydrationMismatch(fiber) {
  var error = Error(formatProdErrorMessage(418, ""));
  queueHydrationError(createCapturedValueAtFiber(error, fiber));
  throw HydrationMismatchException;
}
function prepareToHydrateHostInstance(fiber) {
  var instance = fiber.stateNode, type = fiber.type, props = fiber.memoizedProps;
  instance[internalInstanceKey] = fiber;
  instance[internalPropsKey] = props;
  switch (type) {
    case "dialog":
      listenToNonDelegatedEvent("cancel", instance);
      listenToNonDelegatedEvent("close", instance);
      break;
    case "iframe":
    case "object":
    case "embed":
      listenToNonDelegatedEvent("load", instance);
      break;
    case "video":
    case "audio":
      for (type = 0; type < mediaEventTypes.length; type++)
        listenToNonDelegatedEvent(mediaEventTypes[type], instance);
      break;
    case "source":
      listenToNonDelegatedEvent("error", instance);
      break;
    case "img":
    case "image":
    case "link":
      listenToNonDelegatedEvent("error", instance);
      listenToNonDelegatedEvent("load", instance);
      break;
    case "details":
      listenToNonDelegatedEvent("toggle", instance);
      break;
    case "input":
      listenToNonDelegatedEvent("invalid", instance);
      initInput(
        instance,
        props.value,
        props.defaultValue,
        props.checked,
        props.defaultChecked,
        props.type,
        props.name,
        true
      );
      track(instance);
      break;
    case "select":
      listenToNonDelegatedEvent("invalid", instance);
      break;
    case "textarea":
      listenToNonDelegatedEvent("invalid", instance), initTextarea(instance, props.value, props.defaultValue, props.children), track(instance);
  }
  type = props.children;
  "string" !== typeof type && "number" !== typeof type && "bigint" !== typeof type || instance.textContent === "" + type || true === props.suppressHydrationWarning || checkForUnmatchedText(instance.textContent, type) ? (null != props.popover && (listenToNonDelegatedEvent("beforetoggle", instance), listenToNonDelegatedEvent("toggle", instance)), null != props.onScroll && listenToNonDelegatedEvent("scroll", instance), null != props.onScrollEnd && listenToNonDelegatedEvent("scrollend", instance), null != props.onClick && (instance.onclick = noop$1), instance = true) : instance = false;
  instance || throwOnHydrationMismatch(fiber);
}
function popToNextHostParent(fiber) {
  for (hydrationParentFiber = fiber.return; hydrationParentFiber; )
    switch (hydrationParentFiber.tag) {
      case 3:
      case 27:
        rootOrSingletonContext = true;
        return;
      case 5:
      case 13:
        rootOrSingletonContext = false;
        return;
      default:
        hydrationParentFiber = hydrationParentFiber.return;
    }
}
function popHydrationState(fiber) {
  if (fiber !== hydrationParentFiber) return false;
  if (!isHydrating) return popToNextHostParent(fiber), isHydrating = true, false;
  var shouldClear = false, JSCompiler_temp;
  if (JSCompiler_temp = 3 !== fiber.tag && 27 !== fiber.tag) {
    if (JSCompiler_temp = 5 === fiber.tag)
      JSCompiler_temp = fiber.type, JSCompiler_temp = !("form" !== JSCompiler_temp && "button" !== JSCompiler_temp) || shouldSetTextContent(fiber.type, fiber.memoizedProps);
    JSCompiler_temp = !JSCompiler_temp;
  }
  JSCompiler_temp && (shouldClear = true);
  shouldClear && nextHydratableInstance && throwOnHydrationMismatch(fiber);
  popToNextHostParent(fiber);
  if (13 === fiber.tag) {
    fiber = fiber.memoizedState;
    fiber = null !== fiber ? fiber.dehydrated : null;
    if (!fiber) throw Error(formatProdErrorMessage(317));
    a: {
      fiber = fiber.nextSibling;
      for (shouldClear = 0; fiber; ) {
        if (8 === fiber.nodeType)
          if (JSCompiler_temp = fiber.data, "/$" === JSCompiler_temp) {
            if (0 === shouldClear) {
              nextHydratableInstance = getNextHydratable(fiber.nextSibling);
              break a;
            }
            shouldClear--;
          } else
            "$" !== JSCompiler_temp && "$!" !== JSCompiler_temp && "$?" !== JSCompiler_temp || shouldClear++;
        fiber = fiber.nextSibling;
      }
      nextHydratableInstance = null;
    }
  } else
    nextHydratableInstance = hydrationParentFiber ? getNextHydratable(fiber.stateNode.nextSibling) : null;
  return true;
}
function resetHydrationState() {
  nextHydratableInstance = hydrationParentFiber = null;
  isHydrating = false;
}
function queueHydrationError(error) {
  null === hydrationErrors ? hydrationErrors = [error] : hydrationErrors.push(error);
}
var SuspenseException = Error(formatProdErrorMessage(460)), SuspenseyCommitException = Error(formatProdErrorMessage(474)), noopSuspenseyCommitThenable = { then: function() {
} };
function isThenableResolved(thenable) {
  thenable = thenable.status;
  return "fulfilled" === thenable || "rejected" === thenable;
}
function noop$3() {
}
function trackUsedThenable(thenableState2, thenable, index2) {
  index2 = thenableState2[index2];
  void 0 === index2 ? thenableState2.push(thenable) : index2 !== thenable && (thenable.then(noop$3, noop$3), thenable = index2);
  switch (thenable.status) {
    case "fulfilled":
      return thenable.value;
    case "rejected":
      thenableState2 = thenable.reason;
      if (thenableState2 === SuspenseException)
        throw Error(formatProdErrorMessage(483));
      throw thenableState2;
    default:
      if ("string" === typeof thenable.status) thenable.then(noop$3, noop$3);
      else {
        thenableState2 = workInProgressRoot;
        if (null !== thenableState2 && 100 < thenableState2.shellSuspendCounter)
          throw Error(formatProdErrorMessage(482));
        thenableState2 = thenable;
        thenableState2.status = "pending";
        thenableState2.then(
          function(fulfilledValue) {
            if ("pending" === thenable.status) {
              var fulfilledThenable = thenable;
              fulfilledThenable.status = "fulfilled";
              fulfilledThenable.value = fulfilledValue;
            }
          },
          function(error) {
            if ("pending" === thenable.status) {
              var rejectedThenable = thenable;
              rejectedThenable.status = "rejected";
              rejectedThenable.reason = error;
            }
          }
        );
      }
      switch (thenable.status) {
        case "fulfilled":
          return thenable.value;
        case "rejected":
          thenableState2 = thenable.reason;
          if (thenableState2 === SuspenseException)
            throw Error(formatProdErrorMessage(483));
          throw thenableState2;
      }
      suspendedThenable = thenable;
      throw SuspenseException;
  }
}
var suspendedThenable = null;
function getSuspendedThenable() {
  if (null === suspendedThenable) throw Error(formatProdErrorMessage(459));
  var thenable = suspendedThenable;
  suspendedThenable = null;
  return thenable;
}
var thenableState$1 = null, thenableIndexCounter$1 = 0;
function unwrapThenable(thenable) {
  var index2 = thenableIndexCounter$1;
  thenableIndexCounter$1 += 1;
  null === thenableState$1 && (thenableState$1 = []);
  return trackUsedThenable(thenableState$1, thenable, index2);
}
function coerceRef(workInProgress2, element) {
  element = element.props.ref;
  workInProgress2.ref = void 0 !== element ? element : null;
}
function throwOnInvalidObjectType(returnFiber, newChild) {
  if (newChild.$$typeof === REACT_LEGACY_ELEMENT_TYPE)
    throw Error(formatProdErrorMessage(525));
  returnFiber = Object.prototype.toString.call(newChild);
  throw Error(
    formatProdErrorMessage(
      31,
      "[object Object]" === returnFiber ? "object with keys {" + Object.keys(newChild).join(", ") + "}" : returnFiber
    )
  );
}
function resolveLazy(lazyType) {
  var init = lazyType._init;
  return init(lazyType._payload);
}
function createChildReconciler(shouldTrackSideEffects) {
  function deleteChild(returnFiber, childToDelete) {
    if (shouldTrackSideEffects) {
      var deletions = returnFiber.deletions;
      null === deletions ? (returnFiber.deletions = [childToDelete], returnFiber.flags |= 16) : deletions.push(childToDelete);
    }
  }
  function deleteRemainingChildren(returnFiber, currentFirstChild) {
    if (!shouldTrackSideEffects) return null;
    for (; null !== currentFirstChild; )
      deleteChild(returnFiber, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
    return null;
  }
  function mapRemainingChildren(currentFirstChild) {
    for (var existingChildren = /* @__PURE__ */ new Map(); null !== currentFirstChild; )
      null !== currentFirstChild.key ? existingChildren.set(currentFirstChild.key, currentFirstChild) : existingChildren.set(currentFirstChild.index, currentFirstChild), currentFirstChild = currentFirstChild.sibling;
    return existingChildren;
  }
  function useFiber(fiber, pendingProps) {
    fiber = createWorkInProgress(fiber, pendingProps);
    fiber.index = 0;
    fiber.sibling = null;
    return fiber;
  }
  function placeChild(newFiber, lastPlacedIndex, newIndex) {
    newFiber.index = newIndex;
    if (!shouldTrackSideEffects)
      return newFiber.flags |= 1048576, lastPlacedIndex;
    newIndex = newFiber.alternate;
    if (null !== newIndex)
      return newIndex = newIndex.index, newIndex < lastPlacedIndex ? (newFiber.flags |= 33554434, lastPlacedIndex) : newIndex;
    newFiber.flags |= 33554434;
    return lastPlacedIndex;
  }
  function placeSingleChild(newFiber) {
    shouldTrackSideEffects && null === newFiber.alternate && (newFiber.flags |= 33554434);
    return newFiber;
  }
  function updateTextNode(returnFiber, current, textContent, lanes) {
    if (null === current || 6 !== current.tag)
      return current = createFiberFromText(textContent, returnFiber.mode, lanes), current.return = returnFiber, current;
    current = useFiber(current, textContent);
    current.return = returnFiber;
    return current;
  }
  function updateElement(returnFiber, current, element, lanes) {
    var elementType = element.type;
    if (elementType === REACT_FRAGMENT_TYPE)
      return updateFragment(
        returnFiber,
        current,
        element.props.children,
        lanes,
        element.key
      );
    if (null !== current && (current.elementType === elementType || "object" === typeof elementType && null !== elementType && elementType.$$typeof === REACT_LAZY_TYPE && resolveLazy(elementType) === current.type))
      return current = useFiber(current, element.props), coerceRef(current, element), current.return = returnFiber, current;
    current = createFiberFromTypeAndProps(
      element.type,
      element.key,
      element.props,
      null,
      returnFiber.mode,
      lanes
    );
    coerceRef(current, element);
    current.return = returnFiber;
    return current;
  }
  function updatePortal(returnFiber, current, portal, lanes) {
    if (null === current || 4 !== current.tag || current.stateNode.containerInfo !== portal.containerInfo || current.stateNode.implementation !== portal.implementation)
      return current = createFiberFromPortal(portal, returnFiber.mode, lanes), current.return = returnFiber, current;
    current = useFiber(current, portal.children || []);
    current.return = returnFiber;
    return current;
  }
  function updateFragment(returnFiber, current, fragment, lanes, key) {
    if (null === current || 7 !== current.tag)
      return current = createFiberFromFragment(
        fragment,
        returnFiber.mode,
        lanes,
        key
      ), current.return = returnFiber, current;
    current = useFiber(current, fragment);
    current.return = returnFiber;
    return current;
  }
  function createChild(returnFiber, newChild, lanes) {
    if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
      return newChild = createFiberFromText(
        "" + newChild,
        returnFiber.mode,
        lanes
      ), newChild.return = returnFiber, newChild;
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return lanes = createFiberFromTypeAndProps(
            newChild.type,
            newChild.key,
            newChild.props,
            null,
            returnFiber.mode,
            lanes
          ), coerceRef(lanes, newChild), lanes.return = returnFiber, lanes;
        case REACT_PORTAL_TYPE:
          return newChild = createFiberFromPortal(
            newChild,
            returnFiber.mode,
            lanes
          ), newChild.return = returnFiber, newChild;
        case REACT_LAZY_TYPE:
          var init = newChild._init;
          newChild = init(newChild._payload);
          return createChild(returnFiber, newChild, lanes);
      }
      if (isArrayImpl(newChild) || getIteratorFn(newChild))
        return newChild = createFiberFromFragment(
          newChild,
          returnFiber.mode,
          lanes,
          null
        ), newChild.return = returnFiber, newChild;
      if ("function" === typeof newChild.then)
        return createChild(returnFiber, unwrapThenable(newChild), lanes);
      if (newChild.$$typeof === REACT_CONTEXT_TYPE)
        return createChild(
          returnFiber,
          readContextDuringReconciliation(returnFiber, newChild),
          lanes
        );
      throwOnInvalidObjectType(returnFiber, newChild);
    }
    return null;
  }
  function updateSlot(returnFiber, oldFiber, newChild, lanes) {
    var key = null !== oldFiber ? oldFiber.key : null;
    if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
      return null !== key ? null : updateTextNode(returnFiber, oldFiber, "" + newChild, lanes);
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return newChild.key === key ? updateElement(returnFiber, oldFiber, newChild, lanes) : null;
        case REACT_PORTAL_TYPE:
          return newChild.key === key ? updatePortal(returnFiber, oldFiber, newChild, lanes) : null;
        case REACT_LAZY_TYPE:
          return key = newChild._init, newChild = key(newChild._payload), updateSlot(returnFiber, oldFiber, newChild, lanes);
      }
      if (isArrayImpl(newChild) || getIteratorFn(newChild))
        return null !== key ? null : updateFragment(returnFiber, oldFiber, newChild, lanes, null);
      if ("function" === typeof newChild.then)
        return updateSlot(
          returnFiber,
          oldFiber,
          unwrapThenable(newChild),
          lanes
        );
      if (newChild.$$typeof === REACT_CONTEXT_TYPE)
        return updateSlot(
          returnFiber,
          oldFiber,
          readContextDuringReconciliation(returnFiber, newChild),
          lanes
        );
      throwOnInvalidObjectType(returnFiber, newChild);
    }
    return null;
  }
  function updateFromMap(existingChildren, returnFiber, newIdx, newChild, lanes) {
    if ("string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild)
      return existingChildren = existingChildren.get(newIdx) || null, updateTextNode(returnFiber, existingChildren, "" + newChild, lanes);
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          return existingChildren = existingChildren.get(
            null === newChild.key ? newIdx : newChild.key
          ) || null, updateElement(returnFiber, existingChildren, newChild, lanes);
        case REACT_PORTAL_TYPE:
          return existingChildren = existingChildren.get(
            null === newChild.key ? newIdx : newChild.key
          ) || null, updatePortal(returnFiber, existingChildren, newChild, lanes);
        case REACT_LAZY_TYPE:
          var init = newChild._init;
          newChild = init(newChild._payload);
          return updateFromMap(
            existingChildren,
            returnFiber,
            newIdx,
            newChild,
            lanes
          );
      }
      if (isArrayImpl(newChild) || getIteratorFn(newChild))
        return existingChildren = existingChildren.get(newIdx) || null, updateFragment(returnFiber, existingChildren, newChild, lanes, null);
      if ("function" === typeof newChild.then)
        return updateFromMap(
          existingChildren,
          returnFiber,
          newIdx,
          unwrapThenable(newChild),
          lanes
        );
      if (newChild.$$typeof === REACT_CONTEXT_TYPE)
        return updateFromMap(
          existingChildren,
          returnFiber,
          newIdx,
          readContextDuringReconciliation(returnFiber, newChild),
          lanes
        );
      throwOnInvalidObjectType(returnFiber, newChild);
    }
    return null;
  }
  function reconcileChildrenArray(returnFiber, currentFirstChild, newChildren, lanes) {
    for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null; null !== oldFiber && newIdx < newChildren.length; newIdx++) {
      oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
      var newFiber = updateSlot(
        returnFiber,
        oldFiber,
        newChildren[newIdx],
        lanes
      );
      if (null === newFiber) {
        null === oldFiber && (oldFiber = nextOldFiber);
        break;
      }
      shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
      currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
      null === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }
    if (newIdx === newChildren.length)
      return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
    if (null === oldFiber) {
      for (; newIdx < newChildren.length; newIdx++)
        oldFiber = createChild(returnFiber, newChildren[newIdx], lanes), null !== oldFiber && (currentFirstChild = placeChild(
          oldFiber,
          currentFirstChild,
          newIdx
        ), null === previousNewFiber ? resultingFirstChild = oldFiber : previousNewFiber.sibling = oldFiber, previousNewFiber = oldFiber);
      isHydrating && pushTreeFork(returnFiber, newIdx);
      return resultingFirstChild;
    }
    for (oldFiber = mapRemainingChildren(oldFiber); newIdx < newChildren.length; newIdx++)
      nextOldFiber = updateFromMap(
        oldFiber,
        returnFiber,
        newIdx,
        newChildren[newIdx],
        lanes
      ), null !== nextOldFiber && (shouldTrackSideEffects && null !== nextOldFiber.alternate && oldFiber.delete(
        null === nextOldFiber.key ? newIdx : nextOldFiber.key
      ), currentFirstChild = placeChild(
        nextOldFiber,
        currentFirstChild,
        newIdx
      ), null === previousNewFiber ? resultingFirstChild = nextOldFiber : previousNewFiber.sibling = nextOldFiber, previousNewFiber = nextOldFiber);
    shouldTrackSideEffects && oldFiber.forEach(function(child) {
      return deleteChild(returnFiber, child);
    });
    isHydrating && pushTreeFork(returnFiber, newIdx);
    return resultingFirstChild;
  }
  function reconcileChildrenIterator(returnFiber, currentFirstChild, newChildren, lanes) {
    if (null == newChildren) throw Error(formatProdErrorMessage(151));
    for (var resultingFirstChild = null, previousNewFiber = null, oldFiber = currentFirstChild, newIdx = currentFirstChild = 0, nextOldFiber = null, step = newChildren.next(); null !== oldFiber && !step.done; newIdx++, step = newChildren.next()) {
      oldFiber.index > newIdx ? (nextOldFiber = oldFiber, oldFiber = null) : nextOldFiber = oldFiber.sibling;
      var newFiber = updateSlot(returnFiber, oldFiber, step.value, lanes);
      if (null === newFiber) {
        null === oldFiber && (oldFiber = nextOldFiber);
        break;
      }
      shouldTrackSideEffects && oldFiber && null === newFiber.alternate && deleteChild(returnFiber, oldFiber);
      currentFirstChild = placeChild(newFiber, currentFirstChild, newIdx);
      null === previousNewFiber ? resultingFirstChild = newFiber : previousNewFiber.sibling = newFiber;
      previousNewFiber = newFiber;
      oldFiber = nextOldFiber;
    }
    if (step.done)
      return deleteRemainingChildren(returnFiber, oldFiber), isHydrating && pushTreeFork(returnFiber, newIdx), resultingFirstChild;
    if (null === oldFiber) {
      for (; !step.done; newIdx++, step = newChildren.next())
        step = createChild(returnFiber, step.value, lanes), null !== step && (currentFirstChild = placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = step : previousNewFiber.sibling = step, previousNewFiber = step);
      isHydrating && pushTreeFork(returnFiber, newIdx);
      return resultingFirstChild;
    }
    for (oldFiber = mapRemainingChildren(oldFiber); !step.done; newIdx++, step = newChildren.next())
      step = updateFromMap(oldFiber, returnFiber, newIdx, step.value, lanes), null !== step && (shouldTrackSideEffects && null !== step.alternate && oldFiber.delete(null === step.key ? newIdx : step.key), currentFirstChild = placeChild(step, currentFirstChild, newIdx), null === previousNewFiber ? resultingFirstChild = step : previousNewFiber.sibling = step, previousNewFiber = step);
    shouldTrackSideEffects && oldFiber.forEach(function(child) {
      return deleteChild(returnFiber, child);
    });
    isHydrating && pushTreeFork(returnFiber, newIdx);
    return resultingFirstChild;
  }
  function reconcileChildFibersImpl(returnFiber, currentFirstChild, newChild, lanes) {
    "object" === typeof newChild && null !== newChild && newChild.type === REACT_FRAGMENT_TYPE && null === newChild.key && (newChild = newChild.props.children);
    if ("object" === typeof newChild && null !== newChild) {
      switch (newChild.$$typeof) {
        case REACT_ELEMENT_TYPE:
          a: {
            for (var key = newChild.key; null !== currentFirstChild; ) {
              if (currentFirstChild.key === key) {
                key = newChild.type;
                if (key === REACT_FRAGMENT_TYPE) {
                  if (7 === currentFirstChild.tag) {
                    deleteRemainingChildren(
                      returnFiber,
                      currentFirstChild.sibling
                    );
                    lanes = useFiber(
                      currentFirstChild,
                      newChild.props.children
                    );
                    lanes.return = returnFiber;
                    returnFiber = lanes;
                    break a;
                  }
                } else if (currentFirstChild.elementType === key || "object" === typeof key && null !== key && key.$$typeof === REACT_LAZY_TYPE && resolveLazy(key) === currentFirstChild.type) {
                  deleteRemainingChildren(
                    returnFiber,
                    currentFirstChild.sibling
                  );
                  lanes = useFiber(currentFirstChild, newChild.props);
                  coerceRef(lanes, newChild);
                  lanes.return = returnFiber;
                  returnFiber = lanes;
                  break a;
                }
                deleteRemainingChildren(returnFiber, currentFirstChild);
                break;
              } else deleteChild(returnFiber, currentFirstChild);
              currentFirstChild = currentFirstChild.sibling;
            }
            newChild.type === REACT_FRAGMENT_TYPE ? (lanes = createFiberFromFragment(
              newChild.props.children,
              returnFiber.mode,
              lanes,
              newChild.key
            ), lanes.return = returnFiber, returnFiber = lanes) : (lanes = createFiberFromTypeAndProps(
              newChild.type,
              newChild.key,
              newChild.props,
              null,
              returnFiber.mode,
              lanes
            ), coerceRef(lanes, newChild), lanes.return = returnFiber, returnFiber = lanes);
          }
          return placeSingleChild(returnFiber);
        case REACT_PORTAL_TYPE:
          a: {
            for (key = newChild.key; null !== currentFirstChild; ) {
              if (currentFirstChild.key === key)
                if (4 === currentFirstChild.tag && currentFirstChild.stateNode.containerInfo === newChild.containerInfo && currentFirstChild.stateNode.implementation === newChild.implementation) {
                  deleteRemainingChildren(
                    returnFiber,
                    currentFirstChild.sibling
                  );
                  lanes = useFiber(currentFirstChild, newChild.children || []);
                  lanes.return = returnFiber;
                  returnFiber = lanes;
                  break a;
                } else {
                  deleteRemainingChildren(returnFiber, currentFirstChild);
                  break;
                }
              else deleteChild(returnFiber, currentFirstChild);
              currentFirstChild = currentFirstChild.sibling;
            }
            lanes = createFiberFromPortal(newChild, returnFiber.mode, lanes);
            lanes.return = returnFiber;
            returnFiber = lanes;
          }
          return placeSingleChild(returnFiber);
        case REACT_LAZY_TYPE:
          return key = newChild._init, newChild = key(newChild._payload), reconcileChildFibersImpl(
            returnFiber,
            currentFirstChild,
            newChild,
            lanes
          );
      }
      if (isArrayImpl(newChild))
        return reconcileChildrenArray(
          returnFiber,
          currentFirstChild,
          newChild,
          lanes
        );
      if (getIteratorFn(newChild)) {
        key = getIteratorFn(newChild);
        if ("function" !== typeof key) throw Error(formatProdErrorMessage(150));
        newChild = key.call(newChild);
        return reconcileChildrenIterator(
          returnFiber,
          currentFirstChild,
          newChild,
          lanes
        );
      }
      if ("function" === typeof newChild.then)
        return reconcileChildFibersImpl(
          returnFiber,
          currentFirstChild,
          unwrapThenable(newChild),
          lanes
        );
      if (newChild.$$typeof === REACT_CONTEXT_TYPE)
        return reconcileChildFibersImpl(
          returnFiber,
          currentFirstChild,
          readContextDuringReconciliation(returnFiber, newChild),
          lanes
        );
      throwOnInvalidObjectType(returnFiber, newChild);
    }
    return "string" === typeof newChild && "" !== newChild || "number" === typeof newChild || "bigint" === typeof newChild ? (newChild = "" + newChild, null !== currentFirstChild && 6 === currentFirstChild.tag ? (deleteRemainingChildren(returnFiber, currentFirstChild.sibling), lanes = useFiber(currentFirstChild, newChild), lanes.return = returnFiber, returnFiber = lanes) : (deleteRemainingChildren(returnFiber, currentFirstChild), lanes = createFiberFromText(newChild, returnFiber.mode, lanes), lanes.return = returnFiber, returnFiber = lanes), placeSingleChild(returnFiber)) : deleteRemainingChildren(returnFiber, currentFirstChild);
  }
  return function(returnFiber, currentFirstChild, newChild, lanes) {
    try {
      thenableIndexCounter$1 = 0;
      var firstChildFiber = reconcileChildFibersImpl(
        returnFiber,
        currentFirstChild,
        newChild,
        lanes
      );
      thenableState$1 = null;
      return firstChildFiber;
    } catch (x) {
      if (x === SuspenseException) throw x;
      var fiber = createFiberImplClass(29, x, null, returnFiber.mode);
      fiber.lanes = lanes;
      fiber.return = returnFiber;
      return fiber;
    } finally {
    }
  };
}
var reconcileChildFibers = createChildReconciler(true), mountChildFibers = createChildReconciler(false), currentTreeHiddenStackCursor = createCursor(null), prevEntangledRenderLanesCursor = createCursor(0);
function pushHiddenContext(fiber, context) {
  fiber = entangledRenderLanes;
  push(prevEntangledRenderLanesCursor, fiber);
  push(currentTreeHiddenStackCursor, context);
  entangledRenderLanes = fiber | context.baseLanes;
}
function reuseHiddenContextOnStack() {
  push(prevEntangledRenderLanesCursor, entangledRenderLanes);
  push(currentTreeHiddenStackCursor, currentTreeHiddenStackCursor.current);
}
function popHiddenContext() {
  entangledRenderLanes = prevEntangledRenderLanesCursor.current;
  pop(currentTreeHiddenStackCursor);
  pop(prevEntangledRenderLanesCursor);
}
var suspenseHandlerStackCursor = createCursor(null), shellBoundary = null;
function pushPrimaryTreeSuspenseHandler(handler) {
  var current = handler.alternate;
  push(suspenseStackCursor, suspenseStackCursor.current & 1);
  push(suspenseHandlerStackCursor, handler);
  null === shellBoundary && (null === current || null !== currentTreeHiddenStackCursor.current ? shellBoundary = handler : null !== current.memoizedState && (shellBoundary = handler));
}
function pushOffscreenSuspenseHandler(fiber) {
  if (22 === fiber.tag) {
    if (push(suspenseStackCursor, suspenseStackCursor.current), push(suspenseHandlerStackCursor, fiber), null === shellBoundary) {
      var current = fiber.alternate;
      null !== current && null !== current.memoizedState && (shellBoundary = fiber);
    }
  } else reuseSuspenseHandlerOnStack();
}
function reuseSuspenseHandlerOnStack() {
  push(suspenseStackCursor, suspenseStackCursor.current);
  push(suspenseHandlerStackCursor, suspenseHandlerStackCursor.current);
}
function popSuspenseHandler(fiber) {
  pop(suspenseHandlerStackCursor);
  shellBoundary === fiber && (shellBoundary = null);
  pop(suspenseStackCursor);
}
var suspenseStackCursor = createCursor(0);
function findFirstSuspended(row) {
  for (var node = row; null !== node; ) {
    if (13 === node.tag) {
      var state = node.memoizedState;
      if (null !== state && (state = state.dehydrated, null === state || "$?" === state.data || "$!" === state.data))
        return node;
    } else if (19 === node.tag && void 0 !== node.memoizedProps.revealOrder) {
      if (0 !== (node.flags & 128)) return node;
    } else if (null !== node.child) {
      node.child.return = node;
      node = node.child;
      continue;
    }
    if (node === row) break;
    for (; null === node.sibling; ) {
      if (null === node.return || node.return === row) return null;
      node = node.return;
    }
    node.sibling.return = node.return;
    node = node.sibling;
  }
  return null;
}
var AbortControllerLocal = "undefined" !== typeof AbortController ? AbortController : function() {
  var listeners = [], signal = this.signal = {
    aborted: false,
    addEventListener: function(type, listener) {
      listeners.push(listener);
    }
  };
  this.abort = function() {
    signal.aborted = true;
    listeners.forEach(function(listener) {
      return listener();
    });
  };
}, scheduleCallback$2 = Scheduler.unstable_scheduleCallback, NormalPriority = Scheduler.unstable_NormalPriority, CacheContext = {
  $$typeof: REACT_CONTEXT_TYPE,
  Consumer: null,
  Provider: null,
  _currentValue: null,
  _currentValue2: null,
  _threadCount: 0
};
function createCache() {
  return {
    controller: new AbortControllerLocal(),
    data: /* @__PURE__ */ new Map(),
    refCount: 0
  };
}
function releaseCache(cache) {
  cache.refCount--;
  0 === cache.refCount && scheduleCallback$2(NormalPriority, function() {
    cache.controller.abort();
  });
}
var currentEntangledListeners = null, currentEntangledPendingCount = 0, currentEntangledLane = 0, currentEntangledActionThenable = null;
function entangleAsyncAction(transition, thenable) {
  if (null === currentEntangledListeners) {
    var entangledListeners = currentEntangledListeners = [];
    currentEntangledPendingCount = 0;
    currentEntangledLane = requestTransitionLane();
    currentEntangledActionThenable = {
      status: "pending",
      value: void 0,
      then: function(resolve) {
        entangledListeners.push(resolve);
      }
    };
  }
  currentEntangledPendingCount++;
  thenable.then(pingEngtangledActionScope, pingEngtangledActionScope);
  return thenable;
}
function pingEngtangledActionScope() {
  if (0 === --currentEntangledPendingCount && null !== currentEntangledListeners) {
    null !== currentEntangledActionThenable && (currentEntangledActionThenable.status = "fulfilled");
    var listeners = currentEntangledListeners;
    currentEntangledListeners = null;
    currentEntangledLane = 0;
    currentEntangledActionThenable = null;
    for (var i = 0; i < listeners.length; i++) (0, listeners[i])();
  }
}
function chainThenableValue(thenable, result) {
  var listeners = [], thenableWithOverride = {
    status: "pending",
    value: null,
    reason: null,
    then: function(resolve) {
      listeners.push(resolve);
    }
  };
  thenable.then(
    function() {
      thenableWithOverride.status = "fulfilled";
      thenableWithOverride.value = result;
      for (var i = 0; i < listeners.length; i++) (0, listeners[i])(result);
    },
    function(error) {
      thenableWithOverride.status = "rejected";
      thenableWithOverride.reason = error;
      for (error = 0; error < listeners.length; error++)
        (0, listeners[error])(void 0);
    }
  );
  return thenableWithOverride;
}
var prevOnStartTransitionFinish = ReactSharedInternals.S;
ReactSharedInternals.S = function(transition, returnValue) {
  "object" === typeof returnValue && null !== returnValue && "function" === typeof returnValue.then && entangleAsyncAction(transition, returnValue);
  null !== prevOnStartTransitionFinish && prevOnStartTransitionFinish(transition, returnValue);
};
var resumedCache = createCursor(null);
function peekCacheFromPool() {
  var cacheResumedFromPreviousRender = resumedCache.current;
  return null !== cacheResumedFromPreviousRender ? cacheResumedFromPreviousRender : workInProgressRoot.pooledCache;
}
function pushTransition(offscreenWorkInProgress, prevCachePool) {
  null === prevCachePool ? push(resumedCache, resumedCache.current) : push(resumedCache, prevCachePool.pool);
}
function getSuspendedCache() {
  var cacheFromPool = peekCacheFromPool();
  return null === cacheFromPool ? null : { parent: CacheContext._currentValue, pool: cacheFromPool };
}
var renderLanes = 0, currentlyRenderingFiber$1 = null, currentHook = null, workInProgressHook = null, didScheduleRenderPhaseUpdate = false, didScheduleRenderPhaseUpdateDuringThisPass = false, shouldDoubleInvokeUserFnsInHooksDEV = false, localIdCounter = 0, thenableIndexCounter = 0, thenableState = null, globalClientIdCounter = 0;
function throwInvalidHookError() {
  throw Error(formatProdErrorMessage(321));
}
function areHookInputsEqual(nextDeps, prevDeps) {
  if (null === prevDeps) return false;
  for (var i = 0; i < prevDeps.length && i < nextDeps.length; i++)
    if (!objectIs(nextDeps[i], prevDeps[i])) return false;
  return true;
}
function renderWithHooks(current, workInProgress2, Component, props, secondArg, nextRenderLanes) {
  renderLanes = nextRenderLanes;
  currentlyRenderingFiber$1 = workInProgress2;
  workInProgress2.memoizedState = null;
  workInProgress2.updateQueue = null;
  workInProgress2.lanes = 0;
  ReactSharedInternals.H = null === current || null === current.memoizedState ? HooksDispatcherOnMount : HooksDispatcherOnUpdate;
  shouldDoubleInvokeUserFnsInHooksDEV = false;
  nextRenderLanes = Component(props, secondArg);
  shouldDoubleInvokeUserFnsInHooksDEV = false;
  didScheduleRenderPhaseUpdateDuringThisPass && (nextRenderLanes = renderWithHooksAgain(
    workInProgress2,
    Component,
    props,
    secondArg
  ));
  finishRenderingHooks(current);
  return nextRenderLanes;
}
function finishRenderingHooks(current) {
  ReactSharedInternals.H = ContextOnlyDispatcher;
  var didRenderTooFewHooks = null !== currentHook && null !== currentHook.next;
  renderLanes = 0;
  workInProgressHook = currentHook = currentlyRenderingFiber$1 = null;
  didScheduleRenderPhaseUpdate = false;
  thenableIndexCounter = 0;
  thenableState = null;
  if (didRenderTooFewHooks) throw Error(formatProdErrorMessage(300));
  null === current || didReceiveUpdate || (current = current.dependencies, null !== current && checkIfContextChanged(current) && (didReceiveUpdate = true));
}
function renderWithHooksAgain(workInProgress2, Component, props, secondArg) {
  currentlyRenderingFiber$1 = workInProgress2;
  var numberOfReRenders = 0;
  do {
    didScheduleRenderPhaseUpdateDuringThisPass && (thenableState = null);
    thenableIndexCounter = 0;
    didScheduleRenderPhaseUpdateDuringThisPass = false;
    if (25 <= numberOfReRenders) throw Error(formatProdErrorMessage(301));
    numberOfReRenders += 1;
    workInProgressHook = currentHook = null;
    if (null != workInProgress2.updateQueue) {
      var children = workInProgress2.updateQueue;
      children.lastEffect = null;
      children.events = null;
      children.stores = null;
      null != children.memoCache && (children.memoCache.index = 0);
    }
    ReactSharedInternals.H = HooksDispatcherOnRerender;
    children = Component(props, secondArg);
  } while (didScheduleRenderPhaseUpdateDuringThisPass);
  return children;
}
function TransitionAwareHostComponent() {
  var dispatcher = ReactSharedInternals.H, maybeThenable = dispatcher.useState()[0];
  maybeThenable = "function" === typeof maybeThenable.then ? useThenable(maybeThenable) : maybeThenable;
  dispatcher = dispatcher.useState()[0];
  (null !== currentHook ? currentHook.memoizedState : null) !== dispatcher && (currentlyRenderingFiber$1.flags |= 1024);
  return maybeThenable;
}
function checkDidRenderIdHook() {
  var didRenderIdHook = 0 !== localIdCounter;
  localIdCounter = 0;
  return didRenderIdHook;
}
function bailoutHooks(current, workInProgress2, lanes) {
  workInProgress2.updateQueue = current.updateQueue;
  workInProgress2.flags &= -2053;
  current.lanes &= ~lanes;
}
function resetHooksOnUnwind(workInProgress2) {
  if (didScheduleRenderPhaseUpdate) {
    for (workInProgress2 = workInProgress2.memoizedState; null !== workInProgress2; ) {
      var queue = workInProgress2.queue;
      null !== queue && (queue.pending = null);
      workInProgress2 = workInProgress2.next;
    }
    didScheduleRenderPhaseUpdate = false;
  }
  renderLanes = 0;
  workInProgressHook = currentHook = currentlyRenderingFiber$1 = null;
  didScheduleRenderPhaseUpdateDuringThisPass = false;
  thenableIndexCounter = localIdCounter = 0;
  thenableState = null;
}
function mountWorkInProgressHook() {
  var hook = {
    memoizedState: null,
    baseState: null,
    baseQueue: null,
    queue: null,
    next: null
  };
  null === workInProgressHook ? currentlyRenderingFiber$1.memoizedState = workInProgressHook = hook : workInProgressHook = workInProgressHook.next = hook;
  return workInProgressHook;
}
function updateWorkInProgressHook() {
  if (null === currentHook) {
    var nextCurrentHook = currentlyRenderingFiber$1.alternate;
    nextCurrentHook = null !== nextCurrentHook ? nextCurrentHook.memoizedState : null;
  } else nextCurrentHook = currentHook.next;
  var nextWorkInProgressHook = null === workInProgressHook ? currentlyRenderingFiber$1.memoizedState : workInProgressHook.next;
  if (null !== nextWorkInProgressHook)
    workInProgressHook = nextWorkInProgressHook, currentHook = nextCurrentHook;
  else {
    if (null === nextCurrentHook) {
      if (null === currentlyRenderingFiber$1.alternate)
        throw Error(formatProdErrorMessage(467));
      throw Error(formatProdErrorMessage(310));
    }
    currentHook = nextCurrentHook;
    nextCurrentHook = {
      memoizedState: currentHook.memoizedState,
      baseState: currentHook.baseState,
      baseQueue: currentHook.baseQueue,
      queue: currentHook.queue,
      next: null
    };
    null === workInProgressHook ? currentlyRenderingFiber$1.memoizedState = workInProgressHook = nextCurrentHook : workInProgressHook = workInProgressHook.next = nextCurrentHook;
  }
  return workInProgressHook;
}
var createFunctionComponentUpdateQueue;
createFunctionComponentUpdateQueue = function() {
  return { lastEffect: null, events: null, stores: null, memoCache: null };
};
function useThenable(thenable) {
  var index2 = thenableIndexCounter;
  thenableIndexCounter += 1;
  null === thenableState && (thenableState = []);
  thenable = trackUsedThenable(thenableState, thenable, index2);
  index2 = currentlyRenderingFiber$1;
  null === (null === workInProgressHook ? index2.memoizedState : workInProgressHook.next) && (index2 = index2.alternate, ReactSharedInternals.H = null === index2 || null === index2.memoizedState ? HooksDispatcherOnMount : HooksDispatcherOnUpdate);
  return thenable;
}
function use(usable) {
  if (null !== usable && "object" === typeof usable) {
    if ("function" === typeof usable.then) return useThenable(usable);
    if (usable.$$typeof === REACT_CONTEXT_TYPE) return readContext(usable);
  }
  throw Error(formatProdErrorMessage(438, String(usable)));
}
function useMemoCache(size) {
  var memoCache = null, updateQueue = currentlyRenderingFiber$1.updateQueue;
  null !== updateQueue && (memoCache = updateQueue.memoCache);
  if (null == memoCache) {
    var current = currentlyRenderingFiber$1.alternate;
    null !== current && (current = current.updateQueue, null !== current && (current = current.memoCache, null != current && (memoCache = {
      data: current.data.map(function(array) {
        return array.slice();
      }),
      index: 0
    })));
  }
  null == memoCache && (memoCache = { data: [], index: 0 });
  null === updateQueue && (updateQueue = createFunctionComponentUpdateQueue(), currentlyRenderingFiber$1.updateQueue = updateQueue);
  updateQueue.memoCache = memoCache;
  updateQueue = memoCache.data[memoCache.index];
  if (void 0 === updateQueue)
    for (updateQueue = memoCache.data[memoCache.index] = Array(size), current = 0; current < size; current++)
      updateQueue[current] = REACT_MEMO_CACHE_SENTINEL;
  memoCache.index++;
  return updateQueue;
}
function basicStateReducer(state, action) {
  return "function" === typeof action ? action(state) : action;
}
function updateReducer(reducer) {
  var hook = updateWorkInProgressHook();
  return updateReducerImpl(hook, currentHook, reducer);
}
function updateReducerImpl(hook, current, reducer) {
  var queue = hook.queue;
  if (null === queue) throw Error(formatProdErrorMessage(311));
  queue.lastRenderedReducer = reducer;
  var baseQueue = hook.baseQueue, pendingQueue = queue.pending;
  if (null !== pendingQueue) {
    if (null !== baseQueue) {
      var baseFirst = baseQueue.next;
      baseQueue.next = pendingQueue.next;
      pendingQueue.next = baseFirst;
    }
    current.baseQueue = baseQueue = pendingQueue;
    queue.pending = null;
  }
  pendingQueue = hook.baseState;
  if (null === baseQueue) hook.memoizedState = pendingQueue;
  else {
    current = baseQueue.next;
    var newBaseQueueFirst = baseFirst = null, newBaseQueueLast = null, update = current, didReadFromEntangledAsyncAction$54 = false;
    do {
      var updateLane = update.lane & -536870913;
      if (updateLane !== update.lane ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes & updateLane) === updateLane) {
        var revertLane = update.revertLane;
        if (0 === revertLane)
          null !== newBaseQueueLast && (newBaseQueueLast = newBaseQueueLast.next = {
            lane: 0,
            revertLane: 0,
            action: update.action,
            hasEagerState: update.hasEagerState,
            eagerState: update.eagerState,
            next: null
          }), updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction$54 = true);
        else if ((renderLanes & revertLane) === revertLane) {
          update = update.next;
          revertLane === currentEntangledLane && (didReadFromEntangledAsyncAction$54 = true);
          continue;
        } else
          updateLane = {
            lane: 0,
            revertLane: update.revertLane,
            action: update.action,
            hasEagerState: update.hasEagerState,
            eagerState: update.eagerState,
            next: null
          }, null === newBaseQueueLast ? (newBaseQueueFirst = newBaseQueueLast = updateLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = updateLane, currentlyRenderingFiber$1.lanes |= revertLane, workInProgressRootSkippedLanes |= revertLane;
        updateLane = update.action;
        shouldDoubleInvokeUserFnsInHooksDEV && reducer(pendingQueue, updateLane);
        pendingQueue = update.hasEagerState ? update.eagerState : reducer(pendingQueue, updateLane);
      } else
        revertLane = {
          lane: updateLane,
          revertLane: update.revertLane,
          action: update.action,
          hasEagerState: update.hasEagerState,
          eagerState: update.eagerState,
          next: null
        }, null === newBaseQueueLast ? (newBaseQueueFirst = newBaseQueueLast = revertLane, baseFirst = pendingQueue) : newBaseQueueLast = newBaseQueueLast.next = revertLane, currentlyRenderingFiber$1.lanes |= updateLane, workInProgressRootSkippedLanes |= updateLane;
      update = update.next;
    } while (null !== update && update !== current);
    null === newBaseQueueLast ? baseFirst = pendingQueue : newBaseQueueLast.next = newBaseQueueFirst;
    if (!objectIs(pendingQueue, hook.memoizedState) && (didReceiveUpdate = true, didReadFromEntangledAsyncAction$54 && (reducer = currentEntangledActionThenable, null !== reducer)))
      throw reducer;
    hook.memoizedState = pendingQueue;
    hook.baseState = baseFirst;
    hook.baseQueue = newBaseQueueLast;
    queue.lastRenderedState = pendingQueue;
  }
  null === baseQueue && (queue.lanes = 0);
  return [hook.memoizedState, queue.dispatch];
}
function rerenderReducer(reducer) {
  var hook = updateWorkInProgressHook(), queue = hook.queue;
  if (null === queue) throw Error(formatProdErrorMessage(311));
  queue.lastRenderedReducer = reducer;
  var dispatch = queue.dispatch, lastRenderPhaseUpdate = queue.pending, newState = hook.memoizedState;
  if (null !== lastRenderPhaseUpdate) {
    queue.pending = null;
    var update = lastRenderPhaseUpdate = lastRenderPhaseUpdate.next;
    do
      newState = reducer(newState, update.action), update = update.next;
    while (update !== lastRenderPhaseUpdate);
    objectIs(newState, hook.memoizedState) || (didReceiveUpdate = true);
    hook.memoizedState = newState;
    null === hook.baseQueue && (hook.baseState = newState);
    queue.lastRenderedState = newState;
  }
  return [newState, dispatch];
}
function updateSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
  var fiber = currentlyRenderingFiber$1, hook = updateWorkInProgressHook(), isHydrating$jscomp$0 = isHydrating;
  if (isHydrating$jscomp$0) {
    if (void 0 === getServerSnapshot) throw Error(formatProdErrorMessage(407));
    getServerSnapshot = getServerSnapshot();
  } else getServerSnapshot = getSnapshot();
  var snapshotChanged = !objectIs(
    (currentHook || hook).memoizedState,
    getServerSnapshot
  );
  snapshotChanged && (hook.memoizedState = getServerSnapshot, didReceiveUpdate = true);
  hook = hook.queue;
  updateEffect(subscribeToStore.bind(null, fiber, hook, subscribe), [
    subscribe
  ]);
  if (hook.getSnapshot !== getSnapshot || snapshotChanged || null !== workInProgressHook && workInProgressHook.memoizedState.tag & 1) {
    fiber.flags |= 2048;
    pushEffect(
      9,
      updateStoreInstance.bind(
        null,
        fiber,
        hook,
        getServerSnapshot,
        getSnapshot
      ),
      { destroy: void 0 },
      null
    );
    if (null === workInProgressRoot) throw Error(formatProdErrorMessage(349));
    isHydrating$jscomp$0 || 0 !== (renderLanes & 60) || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
  }
  return getServerSnapshot;
}
function pushStoreConsistencyCheck(fiber, getSnapshot, renderedSnapshot) {
  fiber.flags |= 16384;
  fiber = { getSnapshot, value: renderedSnapshot };
  getSnapshot = currentlyRenderingFiber$1.updateQueue;
  null === getSnapshot ? (getSnapshot = createFunctionComponentUpdateQueue(), currentlyRenderingFiber$1.updateQueue = getSnapshot, getSnapshot.stores = [fiber]) : (renderedSnapshot = getSnapshot.stores, null === renderedSnapshot ? getSnapshot.stores = [fiber] : renderedSnapshot.push(fiber));
}
function updateStoreInstance(fiber, inst, nextSnapshot, getSnapshot) {
  inst.value = nextSnapshot;
  inst.getSnapshot = getSnapshot;
  checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
}
function subscribeToStore(fiber, inst, subscribe) {
  return subscribe(function() {
    checkIfSnapshotChanged(inst) && forceStoreRerender(fiber);
  });
}
function checkIfSnapshotChanged(inst) {
  var latestGetSnapshot = inst.getSnapshot;
  inst = inst.value;
  try {
    var nextValue = latestGetSnapshot();
    return !objectIs(inst, nextValue);
  } catch (error) {
    return true;
  }
}
function forceStoreRerender(fiber) {
  var root2 = enqueueConcurrentRenderForLane(fiber, 2);
  null !== root2 && scheduleUpdateOnFiber(root2, fiber, 2);
}
function mountStateImpl(initialState) {
  var hook = mountWorkInProgressHook();
  if ("function" === typeof initialState) {
    var initialStateInitializer = initialState;
    initialState = initialStateInitializer();
    if (shouldDoubleInvokeUserFnsInHooksDEV) {
      setIsStrictModeForDevtools(true);
      try {
        initialStateInitializer();
      } finally {
        setIsStrictModeForDevtools(false);
      }
    }
  }
  hook.memoizedState = hook.baseState = initialState;
  hook.queue = {
    pending: null,
    lanes: 0,
    dispatch: null,
    lastRenderedReducer: basicStateReducer,
    lastRenderedState: initialState
  };
  return hook;
}
function updateOptimisticImpl(hook, current, passthrough, reducer) {
  hook.baseState = passthrough;
  return updateReducerImpl(
    hook,
    currentHook,
    "function" === typeof reducer ? reducer : basicStateReducer
  );
}
function dispatchActionState(fiber, actionQueue, setPendingState, setState, payload) {
  if (isRenderPhaseUpdate(fiber)) throw Error(formatProdErrorMessage(485));
  fiber = actionQueue.action;
  if (null !== fiber) {
    var actionNode = {
      payload,
      action: fiber,
      next: null,
      isTransition: true,
      status: "pending",
      value: null,
      reason: null,
      listeners: [],
      then: function(listener) {
        actionNode.listeners.push(listener);
      }
    };
    null !== ReactSharedInternals.T ? setPendingState(true) : actionNode.isTransition = false;
    setState(actionNode);
    setPendingState = actionQueue.pending;
    null === setPendingState ? (actionNode.next = actionQueue.pending = actionNode, runActionStateAction(actionQueue, actionNode)) : (actionNode.next = setPendingState.next, actionQueue.pending = setPendingState.next = actionNode);
  }
}
function runActionStateAction(actionQueue, node) {
  var action = node.action, payload = node.payload, prevState = actionQueue.state;
  if (node.isTransition) {
    var prevTransition = ReactSharedInternals.T, currentTransition = {};
    ReactSharedInternals.T = currentTransition;
    try {
      var returnValue = action(prevState, payload), onStartTransitionFinish = ReactSharedInternals.S;
      null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
      handleActionReturnValue(actionQueue, node, returnValue);
    } catch (error) {
      onActionError(actionQueue, node, error);
    } finally {
      ReactSharedInternals.T = prevTransition;
    }
  } else
    try {
      prevTransition = action(prevState, payload), handleActionReturnValue(actionQueue, node, prevTransition);
    } catch (error$60) {
      onActionError(actionQueue, node, error$60);
    }
}
function handleActionReturnValue(actionQueue, node, returnValue) {
  null !== returnValue && "object" === typeof returnValue && "function" === typeof returnValue.then ? returnValue.then(
    function(nextState) {
      onActionSuccess(actionQueue, node, nextState);
    },
    function(error) {
      return onActionError(actionQueue, node, error);
    }
  ) : onActionSuccess(actionQueue, node, returnValue);
}
function onActionSuccess(actionQueue, actionNode, nextState) {
  actionNode.status = "fulfilled";
  actionNode.value = nextState;
  notifyActionListeners(actionNode);
  actionQueue.state = nextState;
  actionNode = actionQueue.pending;
  null !== actionNode && (nextState = actionNode.next, nextState === actionNode ? actionQueue.pending = null : (nextState = nextState.next, actionNode.next = nextState, runActionStateAction(actionQueue, nextState)));
}
function onActionError(actionQueue, actionNode, error) {
  var last = actionQueue.pending;
  actionQueue.pending = null;
  if (null !== last) {
    last = last.next;
    do
      actionNode.status = "rejected", actionNode.reason = error, notifyActionListeners(actionNode), actionNode = actionNode.next;
    while (actionNode !== last);
  }
  actionQueue.action = null;
}
function notifyActionListeners(actionNode) {
  actionNode = actionNode.listeners;
  for (var i = 0; i < actionNode.length; i++) (0, actionNode[i])();
}
function actionStateReducer(oldState, newState) {
  return newState;
}
function mountActionState(action, initialStateProp) {
  if (isHydrating) {
    var ssrFormState = workInProgressRoot.formState;
    if (null !== ssrFormState) {
      a: {
        var JSCompiler_inline_result = currentlyRenderingFiber$1;
        if (isHydrating) {
          if (nextHydratableInstance) {
            b: {
              var JSCompiler_inline_result$jscomp$0 = nextHydratableInstance;
              for (var inRootOrSingleton = rootOrSingletonContext; 8 !== JSCompiler_inline_result$jscomp$0.nodeType; ) {
                if (!inRootOrSingleton) {
                  JSCompiler_inline_result$jscomp$0 = null;
                  break b;
                }
                JSCompiler_inline_result$jscomp$0 = getNextHydratable(
                  JSCompiler_inline_result$jscomp$0.nextSibling
                );
                if (null === JSCompiler_inline_result$jscomp$0) {
                  JSCompiler_inline_result$jscomp$0 = null;
                  break b;
                }
              }
              inRootOrSingleton = JSCompiler_inline_result$jscomp$0.data;
              JSCompiler_inline_result$jscomp$0 = "F!" === inRootOrSingleton || "F" === inRootOrSingleton ? JSCompiler_inline_result$jscomp$0 : null;
            }
            if (JSCompiler_inline_result$jscomp$0) {
              nextHydratableInstance = getNextHydratable(
                JSCompiler_inline_result$jscomp$0.nextSibling
              );
              JSCompiler_inline_result = "F!" === JSCompiler_inline_result$jscomp$0.data;
              break a;
            }
          }
          throwOnHydrationMismatch(JSCompiler_inline_result);
        }
        JSCompiler_inline_result = false;
      }
      JSCompiler_inline_result && (initialStateProp = ssrFormState[0]);
    }
  }
  ssrFormState = mountWorkInProgressHook();
  ssrFormState.memoizedState = ssrFormState.baseState = initialStateProp;
  JSCompiler_inline_result = {
    pending: null,
    lanes: 0,
    dispatch: null,
    lastRenderedReducer: actionStateReducer,
    lastRenderedState: initialStateProp
  };
  ssrFormState.queue = JSCompiler_inline_result;
  ssrFormState = dispatchSetState.bind(
    null,
    currentlyRenderingFiber$1,
    JSCompiler_inline_result
  );
  JSCompiler_inline_result.dispatch = ssrFormState;
  JSCompiler_inline_result = mountStateImpl(false);
  inRootOrSingleton = dispatchOptimisticSetState.bind(
    null,
    currentlyRenderingFiber$1,
    false,
    JSCompiler_inline_result.queue
  );
  JSCompiler_inline_result = mountWorkInProgressHook();
  JSCompiler_inline_result$jscomp$0 = {
    state: initialStateProp,
    dispatch: null,
    action,
    pending: null
  };
  JSCompiler_inline_result.queue = JSCompiler_inline_result$jscomp$0;
  ssrFormState = dispatchActionState.bind(
    null,
    currentlyRenderingFiber$1,
    JSCompiler_inline_result$jscomp$0,
    inRootOrSingleton,
    ssrFormState
  );
  JSCompiler_inline_result$jscomp$0.dispatch = ssrFormState;
  JSCompiler_inline_result.memoizedState = action;
  return [initialStateProp, ssrFormState, false];
}
function updateActionState(action) {
  var stateHook = updateWorkInProgressHook();
  return updateActionStateImpl(stateHook, currentHook, action);
}
function updateActionStateImpl(stateHook, currentStateHook, action) {
  currentStateHook = updateReducerImpl(
    stateHook,
    currentStateHook,
    actionStateReducer
  )[0];
  stateHook = updateReducer(basicStateReducer)[0];
  currentStateHook = "object" === typeof currentStateHook && null !== currentStateHook && "function" === typeof currentStateHook.then ? useThenable(currentStateHook) : currentStateHook;
  var actionQueueHook = updateWorkInProgressHook(), actionQueue = actionQueueHook.queue, dispatch = actionQueue.dispatch;
  action !== actionQueueHook.memoizedState && (currentlyRenderingFiber$1.flags |= 2048, pushEffect(
    9,
    actionStateActionEffect.bind(null, actionQueue, action),
    { destroy: void 0 },
    null
  ));
  return [currentStateHook, dispatch, stateHook];
}
function actionStateActionEffect(actionQueue, action) {
  actionQueue.action = action;
}
function rerenderActionState(action) {
  var stateHook = updateWorkInProgressHook(), currentStateHook = currentHook;
  if (null !== currentStateHook)
    return updateActionStateImpl(stateHook, currentStateHook, action);
  updateWorkInProgressHook();
  stateHook = stateHook.memoizedState;
  currentStateHook = updateWorkInProgressHook();
  var dispatch = currentStateHook.queue.dispatch;
  currentStateHook.memoizedState = action;
  return [stateHook, dispatch, false];
}
function pushEffect(tag, create, inst, deps) {
  tag = { tag, create, inst, deps, next: null };
  create = currentlyRenderingFiber$1.updateQueue;
  null === create && (create = createFunctionComponentUpdateQueue(), currentlyRenderingFiber$1.updateQueue = create);
  inst = create.lastEffect;
  null === inst ? create.lastEffect = tag.next = tag : (deps = inst.next, inst.next = tag, tag.next = deps, create.lastEffect = tag);
  return tag;
}
function updateRef() {
  return updateWorkInProgressHook().memoizedState;
}
function mountEffectImpl(fiberFlags, hookFlags, create, deps) {
  var hook = mountWorkInProgressHook();
  currentlyRenderingFiber$1.flags |= fiberFlags;
  hook.memoizedState = pushEffect(
    1 | hookFlags,
    create,
    { destroy: void 0 },
    void 0 === deps ? null : deps
  );
}
function updateEffectImpl(fiberFlags, hookFlags, create, deps) {
  var hook = updateWorkInProgressHook();
  deps = void 0 === deps ? null : deps;
  var inst = hook.memoizedState.inst;
  null !== currentHook && null !== deps && areHookInputsEqual(deps, currentHook.memoizedState.deps) ? hook.memoizedState = pushEffect(hookFlags, create, inst, deps) : (currentlyRenderingFiber$1.flags |= fiberFlags, hook.memoizedState = pushEffect(1 | hookFlags, create, inst, deps));
}
function mountEffect(create, deps) {
  mountEffectImpl(8390656, 8, create, deps);
}
function updateEffect(create, deps) {
  updateEffectImpl(2048, 8, create, deps);
}
function updateInsertionEffect(create, deps) {
  return updateEffectImpl(4, 2, create, deps);
}
function updateLayoutEffect(create, deps) {
  return updateEffectImpl(4, 4, create, deps);
}
function imperativeHandleEffect(create, ref) {
  if ("function" === typeof ref) {
    create = create();
    var refCleanup = ref(create);
    return function() {
      "function" === typeof refCleanup ? refCleanup() : ref(null);
    };
  }
  if (null !== ref && void 0 !== ref)
    return create = create(), ref.current = create, function() {
      ref.current = null;
    };
}
function updateImperativeHandle(ref, create, deps) {
  deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
  updateEffectImpl(4, 4, imperativeHandleEffect.bind(null, create, ref), deps);
}
function mountDebugValue() {
}
function updateCallback(callback, deps) {
  var hook = updateWorkInProgressHook();
  deps = void 0 === deps ? null : deps;
  var prevState = hook.memoizedState;
  if (null !== deps && areHookInputsEqual(deps, prevState[1]))
    return prevState[0];
  hook.memoizedState = [callback, deps];
  return callback;
}
function updateMemo(nextCreate, deps) {
  var hook = updateWorkInProgressHook();
  deps = void 0 === deps ? null : deps;
  var prevState = hook.memoizedState;
  if (null !== deps && areHookInputsEqual(deps, prevState[1]))
    return prevState[0];
  prevState = nextCreate();
  if (shouldDoubleInvokeUserFnsInHooksDEV) {
    setIsStrictModeForDevtools(true);
    try {
      nextCreate();
    } finally {
      setIsStrictModeForDevtools(false);
    }
  }
  hook.memoizedState = [prevState, deps];
  return prevState;
}
function mountDeferredValueImpl(hook, value, initialValue2) {
  if (void 0 === initialValue2 || 0 !== (renderLanes & 1073741824))
    return hook.memoizedState = value;
  hook.memoizedState = initialValue2;
  hook = requestDeferredLane();
  currentlyRenderingFiber$1.lanes |= hook;
  workInProgressRootSkippedLanes |= hook;
  return initialValue2;
}
function updateDeferredValueImpl(hook, prevValue, value, initialValue2) {
  if (objectIs(value, prevValue)) return value;
  if (null !== currentTreeHiddenStackCursor.current)
    return hook = mountDeferredValueImpl(hook, value, initialValue2), objectIs(hook, prevValue) || (didReceiveUpdate = true), hook;
  if (0 === (renderLanes & 42))
    return didReceiveUpdate = true, hook.memoizedState = value;
  hook = requestDeferredLane();
  currentlyRenderingFiber$1.lanes |= hook;
  workInProgressRootSkippedLanes |= hook;
  return prevValue;
}
function startTransition(fiber, queue, pendingState, finishedState, callback) {
  var previousPriority = ReactDOMSharedInternals.p;
  ReactDOMSharedInternals.p = 0 !== previousPriority && 8 > previousPriority ? previousPriority : 8;
  var prevTransition = ReactSharedInternals.T, currentTransition = {};
  ReactSharedInternals.T = currentTransition;
  dispatchOptimisticSetState(fiber, false, queue, pendingState);
  try {
    var returnValue = callback(), onStartTransitionFinish = ReactSharedInternals.S;
    null !== onStartTransitionFinish && onStartTransitionFinish(currentTransition, returnValue);
    if (null !== returnValue && "object" === typeof returnValue && "function" === typeof returnValue.then) {
      var thenableForFinishedState = chainThenableValue(
        returnValue,
        finishedState
      );
      dispatchSetStateInternal(
        fiber,
        queue,
        thenableForFinishedState,
        requestUpdateLane(fiber)
      );
    } else
      dispatchSetStateInternal(
        fiber,
        queue,
        finishedState,
        requestUpdateLane(fiber)
      );
  } catch (error) {
    dispatchSetStateInternal(
      fiber,
      queue,
      { then: function() {
      }, status: "rejected", reason: error },
      requestUpdateLane()
    );
  } finally {
    ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition;
  }
}
function noop$2() {
}
function startHostTransition(formFiber, pendingState, action, formData) {
  if (5 !== formFiber.tag) throw Error(formatProdErrorMessage(476));
  var queue = ensureFormComponentIsStateful(formFiber).queue;
  startTransition(
    formFiber,
    queue,
    pendingState,
    sharedNotPendingObject,
    null === action ? noop$2 : function() {
      requestFormReset$1(formFiber);
      return action(formData);
    }
  );
}
function ensureFormComponentIsStateful(formFiber) {
  var existingStateHook = formFiber.memoizedState;
  if (null !== existingStateHook) return existingStateHook;
  existingStateHook = {
    memoizedState: sharedNotPendingObject,
    baseState: sharedNotPendingObject,
    baseQueue: null,
    queue: {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: basicStateReducer,
      lastRenderedState: sharedNotPendingObject
    },
    next: null
  };
  var initialResetState = {};
  existingStateHook.next = {
    memoizedState: initialResetState,
    baseState: initialResetState,
    baseQueue: null,
    queue: {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: basicStateReducer,
      lastRenderedState: initialResetState
    },
    next: null
  };
  formFiber.memoizedState = existingStateHook;
  formFiber = formFiber.alternate;
  null !== formFiber && (formFiber.memoizedState = existingStateHook);
  return existingStateHook;
}
function requestFormReset$1(formFiber) {
  var resetStateQueue = ensureFormComponentIsStateful(formFiber).next.queue;
  dispatchSetStateInternal(formFiber, resetStateQueue, {}, requestUpdateLane());
}
function useHostTransitionStatus() {
  return readContext(HostTransitionContext);
}
function updateId() {
  return updateWorkInProgressHook().memoizedState;
}
function updateRefresh() {
  return updateWorkInProgressHook().memoizedState;
}
function refreshCache(fiber) {
  for (var provider = fiber.return; null !== provider; ) {
    switch (provider.tag) {
      case 24:
      case 3:
        var lane = requestUpdateLane();
        fiber = createUpdate(lane);
        var root$63 = enqueueUpdate(provider, fiber, lane);
        null !== root$63 && (scheduleUpdateOnFiber(root$63, provider, lane), entangleTransitions(root$63, provider, lane));
        provider = { cache: createCache() };
        fiber.payload = provider;
        return;
    }
    provider = provider.return;
  }
}
function dispatchReducerAction(fiber, queue, action) {
  var lane = requestUpdateLane();
  action = {
    lane,
    revertLane: 0,
    action,
    hasEagerState: false,
    eagerState: null,
    next: null
  };
  isRenderPhaseUpdate(fiber) ? enqueueRenderPhaseUpdate(queue, action) : (action = enqueueConcurrentHookUpdate(fiber, queue, action, lane), null !== action && (scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue, lane)));
}
function dispatchSetState(fiber, queue, action) {
  var lane = requestUpdateLane();
  dispatchSetStateInternal(fiber, queue, action, lane);
}
function dispatchSetStateInternal(fiber, queue, action, lane) {
  var update = {
    lane,
    revertLane: 0,
    action,
    hasEagerState: false,
    eagerState: null,
    next: null
  };
  if (isRenderPhaseUpdate(fiber)) enqueueRenderPhaseUpdate(queue, update);
  else {
    var alternate = fiber.alternate;
    if (0 === fiber.lanes && (null === alternate || 0 === alternate.lanes) && (alternate = queue.lastRenderedReducer, null !== alternate))
      try {
        var currentState = queue.lastRenderedState, eagerState = alternate(currentState, action);
        update.hasEagerState = true;
        update.eagerState = eagerState;
        if (objectIs(eagerState, currentState))
          return enqueueUpdate$1(fiber, queue, update, 0), null === workInProgressRoot && finishQueueingConcurrentUpdates(), false;
      } catch (error) {
      } finally {
      }
    action = enqueueConcurrentHookUpdate(fiber, queue, update, lane);
    if (null !== action)
      return scheduleUpdateOnFiber(action, fiber, lane), entangleTransitionUpdate(action, queue, lane), true;
  }
  return false;
}
function dispatchOptimisticSetState(fiber, throwIfDuringRender, queue, action) {
  action = {
    lane: 2,
    revertLane: requestTransitionLane(),
    action,
    hasEagerState: false,
    eagerState: null,
    next: null
  };
  if (isRenderPhaseUpdate(fiber)) {
    if (throwIfDuringRender) throw Error(formatProdErrorMessage(479));
  } else
    throwIfDuringRender = enqueueConcurrentHookUpdate(
      fiber,
      queue,
      action,
      2
    ), null !== throwIfDuringRender && scheduleUpdateOnFiber(throwIfDuringRender, fiber, 2);
}
function isRenderPhaseUpdate(fiber) {
  var alternate = fiber.alternate;
  return fiber === currentlyRenderingFiber$1 || null !== alternate && alternate === currentlyRenderingFiber$1;
}
function enqueueRenderPhaseUpdate(queue, update) {
  didScheduleRenderPhaseUpdateDuringThisPass = didScheduleRenderPhaseUpdate = true;
  var pending = queue.pending;
  null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
  queue.pending = update;
}
function entangleTransitionUpdate(root2, queue, lane) {
  if (0 !== (lane & 4194176)) {
    var queueLanes = queue.lanes;
    queueLanes &= root2.pendingLanes;
    lane |= queueLanes;
    queue.lanes = lane;
    markRootEntangled(root2, lane);
  }
}
var ContextOnlyDispatcher = {
  readContext,
  use,
  useCallback: throwInvalidHookError,
  useContext: throwInvalidHookError,
  useEffect: throwInvalidHookError,
  useImperativeHandle: throwInvalidHookError,
  useLayoutEffect: throwInvalidHookError,
  useInsertionEffect: throwInvalidHookError,
  useMemo: throwInvalidHookError,
  useReducer: throwInvalidHookError,
  useRef: throwInvalidHookError,
  useState: throwInvalidHookError,
  useDebugValue: throwInvalidHookError,
  useDeferredValue: throwInvalidHookError,
  useTransition: throwInvalidHookError,
  useSyncExternalStore: throwInvalidHookError,
  useId: throwInvalidHookError
};
ContextOnlyDispatcher.useCacheRefresh = throwInvalidHookError;
ContextOnlyDispatcher.useMemoCache = throwInvalidHookError;
ContextOnlyDispatcher.useHostTransitionStatus = throwInvalidHookError;
ContextOnlyDispatcher.useFormState = throwInvalidHookError;
ContextOnlyDispatcher.useActionState = throwInvalidHookError;
ContextOnlyDispatcher.useOptimistic = throwInvalidHookError;
var HooksDispatcherOnMount = {
  readContext,
  use,
  useCallback: function(callback, deps) {
    mountWorkInProgressHook().memoizedState = [
      callback,
      void 0 === deps ? null : deps
    ];
    return callback;
  },
  useContext: readContext,
  useEffect: mountEffect,
  useImperativeHandle: function(ref, create, deps) {
    deps = null !== deps && void 0 !== deps ? deps.concat([ref]) : null;
    mountEffectImpl(
      4194308,
      4,
      imperativeHandleEffect.bind(null, create, ref),
      deps
    );
  },
  useLayoutEffect: function(create, deps) {
    return mountEffectImpl(4194308, 4, create, deps);
  },
  useInsertionEffect: function(create, deps) {
    mountEffectImpl(4, 2, create, deps);
  },
  useMemo: function(nextCreate, deps) {
    var hook = mountWorkInProgressHook();
    deps = void 0 === deps ? null : deps;
    var nextValue = nextCreate();
    if (shouldDoubleInvokeUserFnsInHooksDEV) {
      setIsStrictModeForDevtools(true);
      try {
        nextCreate();
      } finally {
        setIsStrictModeForDevtools(false);
      }
    }
    hook.memoizedState = [nextValue, deps];
    return nextValue;
  },
  useReducer: function(reducer, initialArg, init) {
    var hook = mountWorkInProgressHook();
    if (void 0 !== init) {
      var initialState = init(initialArg);
      if (shouldDoubleInvokeUserFnsInHooksDEV) {
        setIsStrictModeForDevtools(true);
        try {
          init(initialArg);
        } finally {
          setIsStrictModeForDevtools(false);
        }
      }
    } else initialState = initialArg;
    hook.memoizedState = hook.baseState = initialState;
    reducer = {
      pending: null,
      lanes: 0,
      dispatch: null,
      lastRenderedReducer: reducer,
      lastRenderedState: initialState
    };
    hook.queue = reducer;
    reducer = reducer.dispatch = dispatchReducerAction.bind(
      null,
      currentlyRenderingFiber$1,
      reducer
    );
    return [hook.memoizedState, reducer];
  },
  useRef: function(initialValue2) {
    var hook = mountWorkInProgressHook();
    initialValue2 = { current: initialValue2 };
    return hook.memoizedState = initialValue2;
  },
  useState: function(initialState) {
    initialState = mountStateImpl(initialState);
    var queue = initialState.queue, dispatch = dispatchSetState.bind(null, currentlyRenderingFiber$1, queue);
    queue.dispatch = dispatch;
    return [initialState.memoizedState, dispatch];
  },
  useDebugValue: mountDebugValue,
  useDeferredValue: function(value, initialValue2) {
    var hook = mountWorkInProgressHook();
    return mountDeferredValueImpl(hook, value, initialValue2);
  },
  useTransition: function() {
    var stateHook = mountStateImpl(false);
    stateHook = startTransition.bind(
      null,
      currentlyRenderingFiber$1,
      stateHook.queue,
      true,
      false
    );
    mountWorkInProgressHook().memoizedState = stateHook;
    return [false, stateHook];
  },
  useSyncExternalStore: function(subscribe, getSnapshot, getServerSnapshot) {
    var fiber = currentlyRenderingFiber$1, hook = mountWorkInProgressHook();
    if (isHydrating) {
      if (void 0 === getServerSnapshot)
        throw Error(formatProdErrorMessage(407));
      getServerSnapshot = getServerSnapshot();
    } else {
      getServerSnapshot = getSnapshot();
      if (null === workInProgressRoot) throw Error(formatProdErrorMessage(349));
      0 !== (workInProgressRootRenderLanes & 60) || pushStoreConsistencyCheck(fiber, getSnapshot, getServerSnapshot);
    }
    hook.memoizedState = getServerSnapshot;
    var inst = { value: getServerSnapshot, getSnapshot };
    hook.queue = inst;
    mountEffect(subscribeToStore.bind(null, fiber, inst, subscribe), [
      subscribe
    ]);
    fiber.flags |= 2048;
    pushEffect(
      9,
      updateStoreInstance.bind(
        null,
        fiber,
        inst,
        getServerSnapshot,
        getSnapshot
      ),
      { destroy: void 0 },
      null
    );
    return getServerSnapshot;
  },
  useId: function() {
    var hook = mountWorkInProgressHook(), identifierPrefix = workInProgressRoot.identifierPrefix;
    if (isHydrating) {
      var JSCompiler_inline_result = treeContextOverflow;
      var idWithLeadingBit = treeContextId;
      JSCompiler_inline_result = (idWithLeadingBit & ~(1 << 32 - clz32(idWithLeadingBit) - 1)).toString(32) + JSCompiler_inline_result;
      identifierPrefix = ":" + identifierPrefix + "R" + JSCompiler_inline_result;
      JSCompiler_inline_result = localIdCounter++;
      0 < JSCompiler_inline_result && (identifierPrefix += "H" + JSCompiler_inline_result.toString(32));
      identifierPrefix += ":";
    } else
      JSCompiler_inline_result = globalClientIdCounter++, identifierPrefix = ":" + identifierPrefix + "r" + JSCompiler_inline_result.toString(32) + ":";
    return hook.memoizedState = identifierPrefix;
  },
  useCacheRefresh: function() {
    return mountWorkInProgressHook().memoizedState = refreshCache.bind(
      null,
      currentlyRenderingFiber$1
    );
  }
};
HooksDispatcherOnMount.useMemoCache = useMemoCache;
HooksDispatcherOnMount.useHostTransitionStatus = useHostTransitionStatus;
HooksDispatcherOnMount.useFormState = mountActionState;
HooksDispatcherOnMount.useActionState = mountActionState;
HooksDispatcherOnMount.useOptimistic = function(passthrough) {
  var hook = mountWorkInProgressHook();
  hook.memoizedState = hook.baseState = passthrough;
  var queue = {
    pending: null,
    lanes: 0,
    dispatch: null,
    lastRenderedReducer: null,
    lastRenderedState: null
  };
  hook.queue = queue;
  hook = dispatchOptimisticSetState.bind(
    null,
    currentlyRenderingFiber$1,
    true,
    queue
  );
  queue.dispatch = hook;
  return [passthrough, hook];
};
var HooksDispatcherOnUpdate = {
  readContext,
  use,
  useCallback: updateCallback,
  useContext: readContext,
  useEffect: updateEffect,
  useImperativeHandle: updateImperativeHandle,
  useInsertionEffect: updateInsertionEffect,
  useLayoutEffect: updateLayoutEffect,
  useMemo: updateMemo,
  useReducer: updateReducer,
  useRef: updateRef,
  useState: function() {
    return updateReducer(basicStateReducer);
  },
  useDebugValue: mountDebugValue,
  useDeferredValue: function(value, initialValue2) {
    var hook = updateWorkInProgressHook();
    return updateDeferredValueImpl(
      hook,
      currentHook.memoizedState,
      value,
      initialValue2
    );
  },
  useTransition: function() {
    var booleanOrThenable = updateReducer(basicStateReducer)[0], start = updateWorkInProgressHook().memoizedState;
    return [
      "boolean" === typeof booleanOrThenable ? booleanOrThenable : useThenable(booleanOrThenable),
      start
    ];
  },
  useSyncExternalStore: updateSyncExternalStore,
  useId: updateId
};
HooksDispatcherOnUpdate.useCacheRefresh = updateRefresh;
HooksDispatcherOnUpdate.useMemoCache = useMemoCache;
HooksDispatcherOnUpdate.useHostTransitionStatus = useHostTransitionStatus;
HooksDispatcherOnUpdate.useFormState = updateActionState;
HooksDispatcherOnUpdate.useActionState = updateActionState;
HooksDispatcherOnUpdate.useOptimistic = function(passthrough, reducer) {
  var hook = updateWorkInProgressHook();
  return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
};
var HooksDispatcherOnRerender = {
  readContext,
  use,
  useCallback: updateCallback,
  useContext: readContext,
  useEffect: updateEffect,
  useImperativeHandle: updateImperativeHandle,
  useInsertionEffect: updateInsertionEffect,
  useLayoutEffect: updateLayoutEffect,
  useMemo: updateMemo,
  useReducer: rerenderReducer,
  useRef: updateRef,
  useState: function() {
    return rerenderReducer(basicStateReducer);
  },
  useDebugValue: mountDebugValue,
  useDeferredValue: function(value, initialValue2) {
    var hook = updateWorkInProgressHook();
    return null === currentHook ? mountDeferredValueImpl(hook, value, initialValue2) : updateDeferredValueImpl(
      hook,
      currentHook.memoizedState,
      value,
      initialValue2
    );
  },
  useTransition: function() {
    var booleanOrThenable = rerenderReducer(basicStateReducer)[0], start = updateWorkInProgressHook().memoizedState;
    return [
      "boolean" === typeof booleanOrThenable ? booleanOrThenable : useThenable(booleanOrThenable),
      start
    ];
  },
  useSyncExternalStore: updateSyncExternalStore,
  useId: updateId
};
HooksDispatcherOnRerender.useCacheRefresh = updateRefresh;
HooksDispatcherOnRerender.useMemoCache = useMemoCache;
HooksDispatcherOnRerender.useHostTransitionStatus = useHostTransitionStatus;
HooksDispatcherOnRerender.useFormState = rerenderActionState;
HooksDispatcherOnRerender.useActionState = rerenderActionState;
HooksDispatcherOnRerender.useOptimistic = function(passthrough, reducer) {
  var hook = updateWorkInProgressHook();
  if (null !== currentHook)
    return updateOptimisticImpl(hook, currentHook, passthrough, reducer);
  hook.baseState = passthrough;
  return [passthrough, hook.queue.dispatch];
};
function applyDerivedStateFromProps(workInProgress2, ctor, getDerivedStateFromProps, nextProps) {
  ctor = workInProgress2.memoizedState;
  getDerivedStateFromProps = getDerivedStateFromProps(nextProps, ctor);
  getDerivedStateFromProps = null === getDerivedStateFromProps || void 0 === getDerivedStateFromProps ? ctor : assign({}, ctor, getDerivedStateFromProps);
  workInProgress2.memoizedState = getDerivedStateFromProps;
  0 === workInProgress2.lanes && (workInProgress2.updateQueue.baseState = getDerivedStateFromProps);
}
var classComponentUpdater = {
  isMounted: function(component) {
    return (component = component._reactInternals) ? getNearestMountedFiber(component) === component : false;
  },
  enqueueSetState: function(inst, payload, callback) {
    inst = inst._reactInternals;
    var lane = requestUpdateLane(), update = createUpdate(lane);
    update.payload = payload;
    void 0 !== callback && null !== callback && (update.callback = callback);
    payload = enqueueUpdate(inst, update, lane);
    null !== payload && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
  },
  enqueueReplaceState: function(inst, payload, callback) {
    inst = inst._reactInternals;
    var lane = requestUpdateLane(), update = createUpdate(lane);
    update.tag = 1;
    update.payload = payload;
    void 0 !== callback && null !== callback && (update.callback = callback);
    payload = enqueueUpdate(inst, update, lane);
    null !== payload && (scheduleUpdateOnFiber(payload, inst, lane), entangleTransitions(payload, inst, lane));
  },
  enqueueForceUpdate: function(inst, callback) {
    inst = inst._reactInternals;
    var lane = requestUpdateLane(), update = createUpdate(lane);
    update.tag = 2;
    void 0 !== callback && null !== callback && (update.callback = callback);
    callback = enqueueUpdate(inst, update, lane);
    null !== callback && (scheduleUpdateOnFiber(callback, inst, lane), entangleTransitions(callback, inst, lane));
  }
};
function checkShouldComponentUpdate(workInProgress2, ctor, oldProps, newProps, oldState, newState, nextContext) {
  workInProgress2 = workInProgress2.stateNode;
  return "function" === typeof workInProgress2.shouldComponentUpdate ? workInProgress2.shouldComponentUpdate(newProps, newState, nextContext) : ctor.prototype && ctor.prototype.isPureReactComponent ? !shallowEqual(oldProps, newProps) || !shallowEqual(oldState, newState) : true;
}
function callComponentWillReceiveProps(workInProgress2, instance, newProps, nextContext) {
  workInProgress2 = instance.state;
  "function" === typeof instance.componentWillReceiveProps && instance.componentWillReceiveProps(newProps, nextContext);
  "function" === typeof instance.UNSAFE_componentWillReceiveProps && instance.UNSAFE_componentWillReceiveProps(newProps, nextContext);
  instance.state !== workInProgress2 && classComponentUpdater.enqueueReplaceState(instance, instance.state, null);
}
function resolveClassComponentProps(Component, baseProps) {
  var newProps = baseProps;
  if ("ref" in baseProps) {
    newProps = {};
    for (var propName in baseProps)
      "ref" !== propName && (newProps[propName] = baseProps[propName]);
  }
  if (Component = Component.defaultProps) {
    newProps === baseProps && (newProps = assign({}, newProps));
    for (var propName$67 in Component)
      void 0 === newProps[propName$67] && (newProps[propName$67] = Component[propName$67]);
  }
  return newProps;
}
var reportGlobalError = "function" === typeof reportError ? reportError : function(error) {
  if ("object" === typeof window && "function" === typeof window.ErrorEvent) {
    var event = new window.ErrorEvent("error", {
      bubbles: true,
      cancelable: true,
      message: "object" === typeof error && null !== error && "string" === typeof error.message ? String(error.message) : String(error),
      error
    });
    if (!window.dispatchEvent(event)) return;
  } else if ("object" === typeof process && "function" === typeof process.emit) {
    process.emit("uncaughtException", error);
    return;
  }
  console.error(error);
};
function defaultOnUncaughtError(error) {
  reportGlobalError(error);
}
function defaultOnCaughtError(error) {
  console.error(error);
}
function defaultOnRecoverableError(error) {
  reportGlobalError(error);
}
function logUncaughtError(root2, errorInfo) {
  try {
    var onUncaughtError = root2.onUncaughtError;
    onUncaughtError(errorInfo.value, { componentStack: errorInfo.stack });
  } catch (e$68) {
    setTimeout(function() {
      throw e$68;
    });
  }
}
function logCaughtError(root2, boundary, errorInfo) {
  try {
    var onCaughtError = root2.onCaughtError;
    onCaughtError(errorInfo.value, {
      componentStack: errorInfo.stack,
      errorBoundary: 1 === boundary.tag ? boundary.stateNode : null
    });
  } catch (e$69) {
    setTimeout(function() {
      throw e$69;
    });
  }
}
function createRootErrorUpdate(root2, errorInfo, lane) {
  lane = createUpdate(lane);
  lane.tag = 3;
  lane.payload = { element: null };
  lane.callback = function() {
    logUncaughtError(root2, errorInfo);
  };
  return lane;
}
function createClassErrorUpdate(lane) {
  lane = createUpdate(lane);
  lane.tag = 3;
  return lane;
}
function initializeClassErrorUpdate(update, root2, fiber, errorInfo) {
  var getDerivedStateFromError = fiber.type.getDerivedStateFromError;
  if ("function" === typeof getDerivedStateFromError) {
    var error = errorInfo.value;
    update.payload = function() {
      return getDerivedStateFromError(error);
    };
    update.callback = function() {
      logCaughtError(root2, fiber, errorInfo);
    };
  }
  var inst = fiber.stateNode;
  null !== inst && "function" === typeof inst.componentDidCatch && (update.callback = function() {
    logCaughtError(root2, fiber, errorInfo);
    "function" !== typeof getDerivedStateFromError && (null === legacyErrorBoundariesThatAlreadyFailed ? legacyErrorBoundariesThatAlreadyFailed = /* @__PURE__ */ new Set([this]) : legacyErrorBoundariesThatAlreadyFailed.add(this));
    var stack = errorInfo.stack;
    this.componentDidCatch(errorInfo.value, {
      componentStack: null !== stack ? stack : ""
    });
  });
}
function throwException(root2, returnFiber, sourceFiber, value, rootRenderLanes) {
  sourceFiber.flags |= 32768;
  if (null !== value && "object" === typeof value && "function" === typeof value.then) {
    returnFiber = sourceFiber.alternate;
    null !== returnFiber && propagateParentContextChanges(
      returnFiber,
      sourceFiber,
      rootRenderLanes,
      true
    );
    sourceFiber = suspenseHandlerStackCursor.current;
    if (null !== sourceFiber) {
      switch (sourceFiber.tag) {
        case 13:
          return null === shellBoundary ? renderDidSuspendDelayIfPossible() : null === sourceFiber.alternate && 0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 3), sourceFiber.flags &= -257, sourceFiber.flags |= 65536, sourceFiber.lanes = rootRenderLanes, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, null === returnFiber ? sourceFiber.updateQueue = /* @__PURE__ */ new Set([value]) : returnFiber.add(value), attachPingListener(root2, value, rootRenderLanes)), false;
        case 22:
          return sourceFiber.flags |= 65536, value === noopSuspenseyCommitThenable ? sourceFiber.flags |= 16384 : (returnFiber = sourceFiber.updateQueue, null === returnFiber ? (returnFiber = {
            transitions: null,
            markerInstances: null,
            retryQueue: /* @__PURE__ */ new Set([value])
          }, sourceFiber.updateQueue = returnFiber) : (sourceFiber = returnFiber.retryQueue, null === sourceFiber ? returnFiber.retryQueue = /* @__PURE__ */ new Set([value]) : sourceFiber.add(value)), attachPingListener(root2, value, rootRenderLanes)), false;
      }
      throw Error(formatProdErrorMessage(435, sourceFiber.tag));
    }
    attachPingListener(root2, value, rootRenderLanes);
    renderDidSuspendDelayIfPossible();
    return false;
  }
  if (isHydrating)
    return returnFiber = suspenseHandlerStackCursor.current, null !== returnFiber ? (0 === (returnFiber.flags & 65536) && (returnFiber.flags |= 256), returnFiber.flags |= 65536, returnFiber.lanes = rootRenderLanes, value !== HydrationMismatchException && (root2 = Error(formatProdErrorMessage(422), { cause: value }), queueHydrationError(createCapturedValueAtFiber(root2, sourceFiber)))) : (value !== HydrationMismatchException && (returnFiber = Error(formatProdErrorMessage(423), {
      cause: value
    }), queueHydrationError(
      createCapturedValueAtFiber(returnFiber, sourceFiber)
    )), root2 = root2.current.alternate, root2.flags |= 65536, rootRenderLanes &= -rootRenderLanes, root2.lanes |= rootRenderLanes, value = createCapturedValueAtFiber(value, sourceFiber), rootRenderLanes = createRootErrorUpdate(
      root2.stateNode,
      value,
      rootRenderLanes
    ), enqueueCapturedUpdate(root2, rootRenderLanes), 4 !== workInProgressRootExitStatus && (workInProgressRootExitStatus = 2)), false;
  var wrapperError = Error(formatProdErrorMessage(520), { cause: value });
  wrapperError = createCapturedValueAtFiber(wrapperError, sourceFiber);
  null === workInProgressRootConcurrentErrors ? workInProgressRootConcurrentErrors = [wrapperError] : workInProgressRootConcurrentErrors.push(wrapperError);
  4 !== workInProgressRootExitStatus && (workInProgressRootExitStatus = 2);
  if (null === returnFiber) return true;
  value = createCapturedValueAtFiber(value, sourceFiber);
  sourceFiber = returnFiber;
  do {
    switch (sourceFiber.tag) {
      case 3:
        return sourceFiber.flags |= 65536, root2 = rootRenderLanes & -rootRenderLanes, sourceFiber.lanes |= root2, root2 = createRootErrorUpdate(sourceFiber.stateNode, value, root2), enqueueCapturedUpdate(sourceFiber, root2), false;
      case 1:
        if (returnFiber = sourceFiber.type, wrapperError = sourceFiber.stateNode, 0 === (sourceFiber.flags & 128) && ("function" === typeof returnFiber.getDerivedStateFromError || null !== wrapperError && "function" === typeof wrapperError.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(wrapperError))))
          return sourceFiber.flags |= 65536, rootRenderLanes &= -rootRenderLanes, sourceFiber.lanes |= rootRenderLanes, rootRenderLanes = createClassErrorUpdate(rootRenderLanes), initializeClassErrorUpdate(
            rootRenderLanes,
            root2,
            sourceFiber,
            value
          ), enqueueCapturedUpdate(sourceFiber, rootRenderLanes), false;
    }
    sourceFiber = sourceFiber.return;
  } while (null !== sourceFiber);
  return false;
}
var SelectiveHydrationException = Error(formatProdErrorMessage(461)), didReceiveUpdate = false;
function reconcileChildren(current, workInProgress2, nextChildren, renderLanes2) {
  workInProgress2.child = null === current ? mountChildFibers(workInProgress2, null, nextChildren, renderLanes2) : reconcileChildFibers(
    workInProgress2,
    current.child,
    nextChildren,
    renderLanes2
  );
}
function updateForwardRef(current, workInProgress2, Component, nextProps, renderLanes2) {
  Component = Component.render;
  var ref = workInProgress2.ref;
  if ("ref" in nextProps) {
    var propsWithoutRef = {};
    for (var key in nextProps)
      "ref" !== key && (propsWithoutRef[key] = nextProps[key]);
  } else propsWithoutRef = nextProps;
  prepareToReadContext(workInProgress2);
  nextProps = renderWithHooks(
    current,
    workInProgress2,
    Component,
    propsWithoutRef,
    ref,
    renderLanes2
  );
  key = checkDidRenderIdHook();
  if (null !== current && !didReceiveUpdate)
    return bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
  isHydrating && key && pushMaterializedTreeId(workInProgress2);
  workInProgress2.flags |= 1;
  reconcileChildren(current, workInProgress2, nextProps, renderLanes2);
  return workInProgress2.child;
}
function updateMemoComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
  if (null === current) {
    var type = Component.type;
    if ("function" === typeof type && !shouldConstruct(type) && void 0 === type.defaultProps && null === Component.compare)
      return workInProgress2.tag = 15, workInProgress2.type = type, updateSimpleMemoComponent(
        current,
        workInProgress2,
        type,
        nextProps,
        renderLanes2
      );
    current = createFiberFromTypeAndProps(
      Component.type,
      null,
      nextProps,
      workInProgress2,
      workInProgress2.mode,
      renderLanes2
    );
    current.ref = workInProgress2.ref;
    current.return = workInProgress2;
    return workInProgress2.child = current;
  }
  type = current.child;
  if (!checkScheduledUpdateOrContext(current, renderLanes2)) {
    var prevProps = type.memoizedProps;
    Component = Component.compare;
    Component = null !== Component ? Component : shallowEqual;
    if (Component(prevProps, nextProps) && current.ref === workInProgress2.ref)
      return bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
  }
  workInProgress2.flags |= 1;
  current = createWorkInProgress(type, nextProps);
  current.ref = workInProgress2.ref;
  current.return = workInProgress2;
  return workInProgress2.child = current;
}
function updateSimpleMemoComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
  if (null !== current) {
    var prevProps = current.memoizedProps;
    if (shallowEqual(prevProps, nextProps) && current.ref === workInProgress2.ref)
      if (didReceiveUpdate = false, workInProgress2.pendingProps = nextProps = prevProps, checkScheduledUpdateOrContext(current, renderLanes2))
        0 !== (current.flags & 131072) && (didReceiveUpdate = true);
      else
        return workInProgress2.lanes = current.lanes, bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
  }
  return updateFunctionComponent(
    current,
    workInProgress2,
    Component,
    nextProps,
    renderLanes2
  );
}
function updateOffscreenComponent(current, workInProgress2, renderLanes2) {
  var nextProps = workInProgress2.pendingProps, nextChildren = nextProps.children, nextIsDetached = 0 !== (workInProgress2.stateNode._pendingVisibility & 2), prevState = null !== current ? current.memoizedState : null;
  markRef(current, workInProgress2);
  if ("hidden" === nextProps.mode || nextIsDetached) {
    if (0 !== (workInProgress2.flags & 128)) {
      nextProps = null !== prevState ? prevState.baseLanes | renderLanes2 : renderLanes2;
      if (null !== current) {
        nextChildren = workInProgress2.child = current.child;
        for (nextIsDetached = 0; null !== nextChildren; )
          nextIsDetached = nextIsDetached | nextChildren.lanes | nextChildren.childLanes, nextChildren = nextChildren.sibling;
        workInProgress2.childLanes = nextIsDetached & ~nextProps;
      } else workInProgress2.childLanes = 0, workInProgress2.child = null;
      return deferHiddenOffscreenComponent(
        current,
        workInProgress2,
        nextProps,
        renderLanes2
      );
    }
    if (0 !== (renderLanes2 & 536870912))
      workInProgress2.memoizedState = { baseLanes: 0, cachePool: null }, null !== current && pushTransition(
        workInProgress2,
        null !== prevState ? prevState.cachePool : null
      ), null !== prevState ? pushHiddenContext(workInProgress2, prevState) : reuseHiddenContextOnStack(), pushOffscreenSuspenseHandler(workInProgress2);
    else
      return workInProgress2.lanes = workInProgress2.childLanes = 536870912, deferHiddenOffscreenComponent(
        current,
        workInProgress2,
        null !== prevState ? prevState.baseLanes | renderLanes2 : renderLanes2,
        renderLanes2
      );
  } else
    null !== prevState ? (pushTransition(workInProgress2, prevState.cachePool), pushHiddenContext(workInProgress2, prevState), reuseSuspenseHandlerOnStack(), workInProgress2.memoizedState = null) : (null !== current && pushTransition(workInProgress2, null), reuseHiddenContextOnStack(), reuseSuspenseHandlerOnStack());
  reconcileChildren(current, workInProgress2, nextChildren, renderLanes2);
  return workInProgress2.child;
}
function deferHiddenOffscreenComponent(current, workInProgress2, nextBaseLanes, renderLanes2) {
  var JSCompiler_inline_result = peekCacheFromPool();
  JSCompiler_inline_result = null === JSCompiler_inline_result ? null : { parent: CacheContext._currentValue, pool: JSCompiler_inline_result };
  workInProgress2.memoizedState = {
    baseLanes: nextBaseLanes,
    cachePool: JSCompiler_inline_result
  };
  null !== current && pushTransition(workInProgress2, null);
  reuseHiddenContextOnStack();
  pushOffscreenSuspenseHandler(workInProgress2);
  null !== current && propagateParentContextChanges(current, workInProgress2, renderLanes2, true);
  return null;
}
function markRef(current, workInProgress2) {
  var ref = workInProgress2.ref;
  if (null === ref)
    null !== current && null !== current.ref && (workInProgress2.flags |= 2097664);
  else {
    if ("function" !== typeof ref && "object" !== typeof ref)
      throw Error(formatProdErrorMessage(284));
    if (null === current || current.ref !== ref)
      workInProgress2.flags |= 2097664;
  }
}
function updateFunctionComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
  prepareToReadContext(workInProgress2);
  Component = renderWithHooks(
    current,
    workInProgress2,
    Component,
    nextProps,
    void 0,
    renderLanes2
  );
  nextProps = checkDidRenderIdHook();
  if (null !== current && !didReceiveUpdate)
    return bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
  isHydrating && nextProps && pushMaterializedTreeId(workInProgress2);
  workInProgress2.flags |= 1;
  reconcileChildren(current, workInProgress2, Component, renderLanes2);
  return workInProgress2.child;
}
function replayFunctionComponent(current, workInProgress2, nextProps, Component, secondArg, renderLanes2) {
  prepareToReadContext(workInProgress2);
  workInProgress2.updateQueue = null;
  nextProps = renderWithHooksAgain(
    workInProgress2,
    Component,
    nextProps,
    secondArg
  );
  finishRenderingHooks(current);
  Component = checkDidRenderIdHook();
  if (null !== current && !didReceiveUpdate)
    return bailoutHooks(current, workInProgress2, renderLanes2), bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
  isHydrating && Component && pushMaterializedTreeId(workInProgress2);
  workInProgress2.flags |= 1;
  reconcileChildren(current, workInProgress2, nextProps, renderLanes2);
  return workInProgress2.child;
}
function updateClassComponent(current, workInProgress2, Component, nextProps, renderLanes2) {
  prepareToReadContext(workInProgress2);
  if (null === workInProgress2.stateNode) {
    var context = emptyContextObject, contextType = Component.contextType;
    "object" === typeof contextType && null !== contextType && (context = readContext(contextType));
    context = new Component(nextProps, context);
    workInProgress2.memoizedState = null !== context.state && void 0 !== context.state ? context.state : null;
    context.updater = classComponentUpdater;
    workInProgress2.stateNode = context;
    context._reactInternals = workInProgress2;
    context = workInProgress2.stateNode;
    context.props = nextProps;
    context.state = workInProgress2.memoizedState;
    context.refs = {};
    initializeUpdateQueue(workInProgress2);
    contextType = Component.contextType;
    context.context = "object" === typeof contextType && null !== contextType ? readContext(contextType) : emptyContextObject;
    context.state = workInProgress2.memoizedState;
    contextType = Component.getDerivedStateFromProps;
    "function" === typeof contextType && (applyDerivedStateFromProps(
      workInProgress2,
      Component,
      contextType,
      nextProps
    ), context.state = workInProgress2.memoizedState);
    "function" === typeof Component.getDerivedStateFromProps || "function" === typeof context.getSnapshotBeforeUpdate || "function" !== typeof context.UNSAFE_componentWillMount && "function" !== typeof context.componentWillMount || (contextType = context.state, "function" === typeof context.componentWillMount && context.componentWillMount(), "function" === typeof context.UNSAFE_componentWillMount && context.UNSAFE_componentWillMount(), contextType !== context.state && classComponentUpdater.enqueueReplaceState(context, context.state, null), processUpdateQueue(workInProgress2, nextProps, context, renderLanes2), suspendIfUpdateReadFromEntangledAsyncAction(), context.state = workInProgress2.memoizedState);
    "function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308);
    nextProps = true;
  } else if (null === current) {
    context = workInProgress2.stateNode;
    var unresolvedOldProps = workInProgress2.memoizedProps, oldProps = resolveClassComponentProps(Component, unresolvedOldProps);
    context.props = oldProps;
    var oldContext = context.context, contextType$jscomp$0 = Component.contextType;
    contextType = emptyContextObject;
    "object" === typeof contextType$jscomp$0 && null !== contextType$jscomp$0 && (contextType = readContext(contextType$jscomp$0));
    var getDerivedStateFromProps = Component.getDerivedStateFromProps;
    contextType$jscomp$0 = "function" === typeof getDerivedStateFromProps || "function" === typeof context.getSnapshotBeforeUpdate;
    unresolvedOldProps = workInProgress2.pendingProps !== unresolvedOldProps;
    contextType$jscomp$0 || "function" !== typeof context.UNSAFE_componentWillReceiveProps && "function" !== typeof context.componentWillReceiveProps || (unresolvedOldProps || oldContext !== contextType) && callComponentWillReceiveProps(
      workInProgress2,
      context,
      nextProps,
      contextType
    );
    hasForceUpdate = false;
    var oldState = workInProgress2.memoizedState;
    context.state = oldState;
    processUpdateQueue(workInProgress2, nextProps, context, renderLanes2);
    suspendIfUpdateReadFromEntangledAsyncAction();
    oldContext = workInProgress2.memoizedState;
    unresolvedOldProps || oldState !== oldContext || hasForceUpdate ? ("function" === typeof getDerivedStateFromProps && (applyDerivedStateFromProps(
      workInProgress2,
      Component,
      getDerivedStateFromProps,
      nextProps
    ), oldContext = workInProgress2.memoizedState), (oldProps = hasForceUpdate || checkShouldComponentUpdate(
      workInProgress2,
      Component,
      oldProps,
      nextProps,
      oldState,
      oldContext,
      contextType
    )) ? (contextType$jscomp$0 || "function" !== typeof context.UNSAFE_componentWillMount && "function" !== typeof context.componentWillMount || ("function" === typeof context.componentWillMount && context.componentWillMount(), "function" === typeof context.UNSAFE_componentWillMount && context.UNSAFE_componentWillMount()), "function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308)) : ("function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308), workInProgress2.memoizedProps = nextProps, workInProgress2.memoizedState = oldContext), context.props = nextProps, context.state = oldContext, context.context = contextType, nextProps = oldProps) : ("function" === typeof context.componentDidMount && (workInProgress2.flags |= 4194308), nextProps = false);
  } else {
    context = workInProgress2.stateNode;
    cloneUpdateQueue(current, workInProgress2);
    contextType = workInProgress2.memoizedProps;
    contextType$jscomp$0 = resolveClassComponentProps(Component, contextType);
    context.props = contextType$jscomp$0;
    getDerivedStateFromProps = workInProgress2.pendingProps;
    oldState = context.context;
    oldContext = Component.contextType;
    oldProps = emptyContextObject;
    "object" === typeof oldContext && null !== oldContext && (oldProps = readContext(oldContext));
    unresolvedOldProps = Component.getDerivedStateFromProps;
    (oldContext = "function" === typeof unresolvedOldProps || "function" === typeof context.getSnapshotBeforeUpdate) || "function" !== typeof context.UNSAFE_componentWillReceiveProps && "function" !== typeof context.componentWillReceiveProps || (contextType !== getDerivedStateFromProps || oldState !== oldProps) && callComponentWillReceiveProps(
      workInProgress2,
      context,
      nextProps,
      oldProps
    );
    hasForceUpdate = false;
    oldState = workInProgress2.memoizedState;
    context.state = oldState;
    processUpdateQueue(workInProgress2, nextProps, context, renderLanes2);
    suspendIfUpdateReadFromEntangledAsyncAction();
    var newState = workInProgress2.memoizedState;
    contextType !== getDerivedStateFromProps || oldState !== newState || hasForceUpdate || null !== current && null !== current.dependencies && checkIfContextChanged(current.dependencies) ? ("function" === typeof unresolvedOldProps && (applyDerivedStateFromProps(
      workInProgress2,
      Component,
      unresolvedOldProps,
      nextProps
    ), newState = workInProgress2.memoizedState), (contextType$jscomp$0 = hasForceUpdate || checkShouldComponentUpdate(
      workInProgress2,
      Component,
      contextType$jscomp$0,
      nextProps,
      oldState,
      newState,
      oldProps
    ) || null !== current && null !== current.dependencies && checkIfContextChanged(current.dependencies)) ? (oldContext || "function" !== typeof context.UNSAFE_componentWillUpdate && "function" !== typeof context.componentWillUpdate || ("function" === typeof context.componentWillUpdate && context.componentWillUpdate(nextProps, newState, oldProps), "function" === typeof context.UNSAFE_componentWillUpdate && context.UNSAFE_componentWillUpdate(
      nextProps,
      newState,
      oldProps
    )), "function" === typeof context.componentDidUpdate && (workInProgress2.flags |= 4), "function" === typeof context.getSnapshotBeforeUpdate && (workInProgress2.flags |= 1024)) : ("function" !== typeof context.componentDidUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 4), "function" !== typeof context.getSnapshotBeforeUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 1024), workInProgress2.memoizedProps = nextProps, workInProgress2.memoizedState = newState), context.props = nextProps, context.state = newState, context.context = oldProps, nextProps = contextType$jscomp$0) : ("function" !== typeof context.componentDidUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 4), "function" !== typeof context.getSnapshotBeforeUpdate || contextType === current.memoizedProps && oldState === current.memoizedState || (workInProgress2.flags |= 1024), nextProps = false);
  }
  context = nextProps;
  markRef(current, workInProgress2);
  nextProps = 0 !== (workInProgress2.flags & 128);
  context || nextProps ? (context = workInProgress2.stateNode, Component = nextProps && "function" !== typeof Component.getDerivedStateFromError ? null : context.render(), workInProgress2.flags |= 1, null !== current && nextProps ? (workInProgress2.child = reconcileChildFibers(
    workInProgress2,
    current.child,
    null,
    renderLanes2
  ), workInProgress2.child = reconcileChildFibers(
    workInProgress2,
    null,
    Component,
    renderLanes2
  )) : reconcileChildren(current, workInProgress2, Component, renderLanes2), workInProgress2.memoizedState = context.state, current = workInProgress2.child) : current = bailoutOnAlreadyFinishedWork(
    current,
    workInProgress2,
    renderLanes2
  );
  return current;
}
function mountHostRootWithoutHydrating(current, workInProgress2, nextChildren, renderLanes2) {
  resetHydrationState();
  workInProgress2.flags |= 256;
  reconcileChildren(current, workInProgress2, nextChildren, renderLanes2);
  return workInProgress2.child;
}
var SUSPENDED_MARKER = { dehydrated: null, treeContext: null, retryLane: 0 };
function mountSuspenseOffscreenState(renderLanes2) {
  return { baseLanes: renderLanes2, cachePool: getSuspendedCache() };
}
function getRemainingWorkInPrimaryTree(current, primaryTreeDidDefer, renderLanes2) {
  current = null !== current ? current.childLanes & ~renderLanes2 : 0;
  primaryTreeDidDefer && (current |= workInProgressDeferredLane);
  return current;
}
function updateSuspenseComponent(current, workInProgress2, renderLanes2) {
  var nextProps = workInProgress2.pendingProps, showFallback = false, didSuspend = 0 !== (workInProgress2.flags & 128), JSCompiler_temp;
  (JSCompiler_temp = didSuspend) || (JSCompiler_temp = null !== current && null === current.memoizedState ? false : 0 !== (suspenseStackCursor.current & 2));
  JSCompiler_temp && (showFallback = true, workInProgress2.flags &= -129);
  JSCompiler_temp = 0 !== (workInProgress2.flags & 32);
  workInProgress2.flags &= -33;
  if (null === current) {
    if (isHydrating) {
      showFallback ? pushPrimaryTreeSuspenseHandler(workInProgress2) : reuseSuspenseHandlerOnStack();
      if (isHydrating) {
        var nextInstance = nextHydratableInstance, JSCompiler_temp$jscomp$0;
        if (JSCompiler_temp$jscomp$0 = nextInstance) {
          c: {
            JSCompiler_temp$jscomp$0 = nextInstance;
            for (nextInstance = rootOrSingletonContext; 8 !== JSCompiler_temp$jscomp$0.nodeType; ) {
              if (!nextInstance) {
                nextInstance = null;
                break c;
              }
              JSCompiler_temp$jscomp$0 = getNextHydratable(
                JSCompiler_temp$jscomp$0.nextSibling
              );
              if (null === JSCompiler_temp$jscomp$0) {
                nextInstance = null;
                break c;
              }
            }
            nextInstance = JSCompiler_temp$jscomp$0;
          }
          null !== nextInstance ? (workInProgress2.memoizedState = {
            dehydrated: nextInstance,
            treeContext: null !== treeContextProvider ? { id: treeContextId, overflow: treeContextOverflow } : null,
            retryLane: 536870912
          }, JSCompiler_temp$jscomp$0 = createFiberImplClass(
            18,
            null,
            null,
            0
          ), JSCompiler_temp$jscomp$0.stateNode = nextInstance, JSCompiler_temp$jscomp$0.return = workInProgress2, workInProgress2.child = JSCompiler_temp$jscomp$0, hydrationParentFiber = workInProgress2, nextHydratableInstance = null, JSCompiler_temp$jscomp$0 = true) : JSCompiler_temp$jscomp$0 = false;
        }
        JSCompiler_temp$jscomp$0 || throwOnHydrationMismatch(workInProgress2);
      }
      nextInstance = workInProgress2.memoizedState;
      if (null !== nextInstance && (nextInstance = nextInstance.dehydrated, null !== nextInstance))
        return "$!" === nextInstance.data ? workInProgress2.lanes = 16 : workInProgress2.lanes = 536870912, null;
      popSuspenseHandler(workInProgress2);
    }
    nextInstance = nextProps.children;
    nextProps = nextProps.fallback;
    if (showFallback)
      return reuseSuspenseHandlerOnStack(), showFallback = workInProgress2.mode, nextInstance = mountWorkInProgressOffscreenFiber(
        { mode: "hidden", children: nextInstance },
        showFallback
      ), nextProps = createFiberFromFragment(
        nextProps,
        showFallback,
        renderLanes2,
        null
      ), nextInstance.return = workInProgress2, nextProps.return = workInProgress2, nextInstance.sibling = nextProps, workInProgress2.child = nextInstance, showFallback = workInProgress2.child, showFallback.memoizedState = mountSuspenseOffscreenState(renderLanes2), showFallback.childLanes = getRemainingWorkInPrimaryTree(
        current,
        JSCompiler_temp,
        renderLanes2
      ), workInProgress2.memoizedState = SUSPENDED_MARKER, nextProps;
    pushPrimaryTreeSuspenseHandler(workInProgress2);
    return mountSuspensePrimaryChildren(workInProgress2, nextInstance);
  }
  JSCompiler_temp$jscomp$0 = current.memoizedState;
  if (null !== JSCompiler_temp$jscomp$0 && (nextInstance = JSCompiler_temp$jscomp$0.dehydrated, null !== nextInstance)) {
    if (didSuspend)
      workInProgress2.flags & 256 ? (pushPrimaryTreeSuspenseHandler(workInProgress2), workInProgress2.flags &= -257, workInProgress2 = retrySuspenseComponentWithoutHydrating(
        current,
        workInProgress2,
        renderLanes2
      )) : null !== workInProgress2.memoizedState ? (reuseSuspenseHandlerOnStack(), workInProgress2.child = current.child, workInProgress2.flags |= 128, workInProgress2 = null) : (reuseSuspenseHandlerOnStack(), showFallback = nextProps.fallback, nextInstance = workInProgress2.mode, nextProps = mountWorkInProgressOffscreenFiber(
        { mode: "visible", children: nextProps.children },
        nextInstance
      ), showFallback = createFiberFromFragment(
        showFallback,
        nextInstance,
        renderLanes2,
        null
      ), showFallback.flags |= 2, nextProps.return = workInProgress2, showFallback.return = workInProgress2, nextProps.sibling = showFallback, workInProgress2.child = nextProps, reconcileChildFibers(
        workInProgress2,
        current.child,
        null,
        renderLanes2
      ), nextProps = workInProgress2.child, nextProps.memoizedState = mountSuspenseOffscreenState(renderLanes2), nextProps.childLanes = getRemainingWorkInPrimaryTree(
        current,
        JSCompiler_temp,
        renderLanes2
      ), workInProgress2.memoizedState = SUSPENDED_MARKER, workInProgress2 = showFallback);
    else if (pushPrimaryTreeSuspenseHandler(workInProgress2), "$!" === nextInstance.data) {
      JSCompiler_temp = nextInstance.nextSibling && nextInstance.nextSibling.dataset;
      if (JSCompiler_temp) var digest = JSCompiler_temp.dgst;
      JSCompiler_temp = digest;
      nextProps = Error(formatProdErrorMessage(419));
      nextProps.stack = "";
      nextProps.digest = JSCompiler_temp;
      queueHydrationError({ value: nextProps, source: null, stack: null });
      workInProgress2 = retrySuspenseComponentWithoutHydrating(
        current,
        workInProgress2,
        renderLanes2
      );
    } else if (didReceiveUpdate || propagateParentContextChanges(current, workInProgress2, renderLanes2, false), JSCompiler_temp = 0 !== (renderLanes2 & current.childLanes), didReceiveUpdate || JSCompiler_temp) {
      JSCompiler_temp = workInProgressRoot;
      if (null !== JSCompiler_temp) {
        nextProps = renderLanes2 & -renderLanes2;
        if (0 !== (nextProps & 42)) nextProps = 1;
        else
          switch (nextProps) {
            case 2:
              nextProps = 1;
              break;
            case 8:
              nextProps = 4;
              break;
            case 32:
              nextProps = 16;
              break;
            case 128:
            case 256:
            case 512:
            case 1024:
            case 2048:
            case 4096:
            case 8192:
            case 16384:
            case 32768:
            case 65536:
            case 131072:
            case 262144:
            case 524288:
            case 1048576:
            case 2097152:
            case 4194304:
            case 8388608:
            case 16777216:
            case 33554432:
              nextProps = 64;
              break;
            case 268435456:
              nextProps = 134217728;
              break;
            default:
              nextProps = 0;
          }
        nextProps = 0 !== (nextProps & (JSCompiler_temp.suspendedLanes | renderLanes2)) ? 0 : nextProps;
        if (0 !== nextProps && nextProps !== JSCompiler_temp$jscomp$0.retryLane)
          throw JSCompiler_temp$jscomp$0.retryLane = nextProps, enqueueConcurrentRenderForLane(current, nextProps), scheduleUpdateOnFiber(JSCompiler_temp, current, nextProps), SelectiveHydrationException;
      }
      "$?" === nextInstance.data || renderDidSuspendDelayIfPossible();
      workInProgress2 = retrySuspenseComponentWithoutHydrating(
        current,
        workInProgress2,
        renderLanes2
      );
    } else
      "$?" === nextInstance.data ? (workInProgress2.flags |= 128, workInProgress2.child = current.child, workInProgress2 = retryDehydratedSuspenseBoundary.bind(
        null,
        current
      ), nextInstance._reactRetry = workInProgress2, workInProgress2 = null) : (current = JSCompiler_temp$jscomp$0.treeContext, nextHydratableInstance = getNextHydratable(
        nextInstance.nextSibling
      ), hydrationParentFiber = workInProgress2, isHydrating = true, hydrationErrors = null, rootOrSingletonContext = false, null !== current && (idStack[idStackIndex++] = treeContextId, idStack[idStackIndex++] = treeContextOverflow, idStack[idStackIndex++] = treeContextProvider, treeContextId = current.id, treeContextOverflow = current.overflow, treeContextProvider = workInProgress2), workInProgress2 = mountSuspensePrimaryChildren(
        workInProgress2,
        nextProps.children
      ), workInProgress2.flags |= 4096);
    return workInProgress2;
  }
  if (showFallback)
    return reuseSuspenseHandlerOnStack(), showFallback = nextProps.fallback, nextInstance = workInProgress2.mode, JSCompiler_temp$jscomp$0 = current.child, digest = JSCompiler_temp$jscomp$0.sibling, nextProps = createWorkInProgress(JSCompiler_temp$jscomp$0, {
      mode: "hidden",
      children: nextProps.children
    }), nextProps.subtreeFlags = JSCompiler_temp$jscomp$0.subtreeFlags & 31457280, null !== digest ? showFallback = createWorkInProgress(digest, showFallback) : (showFallback = createFiberFromFragment(
      showFallback,
      nextInstance,
      renderLanes2,
      null
    ), showFallback.flags |= 2), showFallback.return = workInProgress2, nextProps.return = workInProgress2, nextProps.sibling = showFallback, workInProgress2.child = nextProps, nextProps = showFallback, showFallback = workInProgress2.child, nextInstance = current.child.memoizedState, null === nextInstance ? nextInstance = mountSuspenseOffscreenState(renderLanes2) : (JSCompiler_temp$jscomp$0 = nextInstance.cachePool, null !== JSCompiler_temp$jscomp$0 ? (digest = CacheContext._currentValue, JSCompiler_temp$jscomp$0 = JSCompiler_temp$jscomp$0.parent !== digest ? { parent: digest, pool: digest } : JSCompiler_temp$jscomp$0) : JSCompiler_temp$jscomp$0 = getSuspendedCache(), nextInstance = {
      baseLanes: nextInstance.baseLanes | renderLanes2,
      cachePool: JSCompiler_temp$jscomp$0
    }), showFallback.memoizedState = nextInstance, showFallback.childLanes = getRemainingWorkInPrimaryTree(
      current,
      JSCompiler_temp,
      renderLanes2
    ), workInProgress2.memoizedState = SUSPENDED_MARKER, nextProps;
  pushPrimaryTreeSuspenseHandler(workInProgress2);
  renderLanes2 = current.child;
  current = renderLanes2.sibling;
  renderLanes2 = createWorkInProgress(renderLanes2, {
    mode: "visible",
    children: nextProps.children
  });
  renderLanes2.return = workInProgress2;
  renderLanes2.sibling = null;
  null !== current && (JSCompiler_temp = workInProgress2.deletions, null === JSCompiler_temp ? (workInProgress2.deletions = [current], workInProgress2.flags |= 16) : JSCompiler_temp.push(current));
  workInProgress2.child = renderLanes2;
  workInProgress2.memoizedState = null;
  return renderLanes2;
}
function mountSuspensePrimaryChildren(workInProgress2, primaryChildren) {
  primaryChildren = mountWorkInProgressOffscreenFiber(
    { mode: "visible", children: primaryChildren },
    workInProgress2.mode
  );
  primaryChildren.return = workInProgress2;
  return workInProgress2.child = primaryChildren;
}
function mountWorkInProgressOffscreenFiber(offscreenProps, mode) {
  return createFiberFromOffscreen(offscreenProps, mode, 0, null);
}
function retrySuspenseComponentWithoutHydrating(current, workInProgress2, renderLanes2) {
  reconcileChildFibers(workInProgress2, current.child, null, renderLanes2);
  current = mountSuspensePrimaryChildren(
    workInProgress2,
    workInProgress2.pendingProps.children
  );
  current.flags |= 2;
  workInProgress2.memoizedState = null;
  return current;
}
function scheduleSuspenseWorkOnFiber(fiber, renderLanes2, propagationRoot) {
  fiber.lanes |= renderLanes2;
  var alternate = fiber.alternate;
  null !== alternate && (alternate.lanes |= renderLanes2);
  scheduleContextWorkOnParentPath(fiber.return, renderLanes2, propagationRoot);
}
function initSuspenseListRenderState(workInProgress2, isBackwards, tail, lastContentRow, tailMode) {
  var renderState = workInProgress2.memoizedState;
  null === renderState ? workInProgress2.memoizedState = {
    isBackwards,
    rendering: null,
    renderingStartTime: 0,
    last: lastContentRow,
    tail,
    tailMode
  } : (renderState.isBackwards = isBackwards, renderState.rendering = null, renderState.renderingStartTime = 0, renderState.last = lastContentRow, renderState.tail = tail, renderState.tailMode = tailMode);
}
function updateSuspenseListComponent(current, workInProgress2, renderLanes2) {
  var nextProps = workInProgress2.pendingProps, revealOrder = nextProps.revealOrder, tailMode = nextProps.tail;
  reconcileChildren(current, workInProgress2, nextProps.children, renderLanes2);
  nextProps = suspenseStackCursor.current;
  if (0 !== (nextProps & 2))
    nextProps = nextProps & 1 | 2, workInProgress2.flags |= 128;
  else {
    if (null !== current && 0 !== (current.flags & 128))
      a: for (current = workInProgress2.child; null !== current; ) {
        if (13 === current.tag)
          null !== current.memoizedState && scheduleSuspenseWorkOnFiber(current, renderLanes2, workInProgress2);
        else if (19 === current.tag)
          scheduleSuspenseWorkOnFiber(current, renderLanes2, workInProgress2);
        else if (null !== current.child) {
          current.child.return = current;
          current = current.child;
          continue;
        }
        if (current === workInProgress2) break a;
        for (; null === current.sibling; ) {
          if (null === current.return || current.return === workInProgress2)
            break a;
          current = current.return;
        }
        current.sibling.return = current.return;
        current = current.sibling;
      }
    nextProps &= 1;
  }
  push(suspenseStackCursor, nextProps);
  switch (revealOrder) {
    case "forwards":
      renderLanes2 = workInProgress2.child;
      for (revealOrder = null; null !== renderLanes2; )
        current = renderLanes2.alternate, null !== current && null === findFirstSuspended(current) && (revealOrder = renderLanes2), renderLanes2 = renderLanes2.sibling;
      renderLanes2 = revealOrder;
      null === renderLanes2 ? (revealOrder = workInProgress2.child, workInProgress2.child = null) : (revealOrder = renderLanes2.sibling, renderLanes2.sibling = null);
      initSuspenseListRenderState(
        workInProgress2,
        false,
        revealOrder,
        renderLanes2,
        tailMode
      );
      break;
    case "backwards":
      renderLanes2 = null;
      revealOrder = workInProgress2.child;
      for (workInProgress2.child = null; null !== revealOrder; ) {
        current = revealOrder.alternate;
        if (null !== current && null === findFirstSuspended(current)) {
          workInProgress2.child = revealOrder;
          break;
        }
        current = revealOrder.sibling;
        revealOrder.sibling = renderLanes2;
        renderLanes2 = revealOrder;
        revealOrder = current;
      }
      initSuspenseListRenderState(
        workInProgress2,
        true,
        renderLanes2,
        null,
        tailMode
      );
      break;
    case "together":
      initSuspenseListRenderState(workInProgress2, false, null, null, void 0);
      break;
    default:
      workInProgress2.memoizedState = null;
  }
  return workInProgress2.child;
}
function bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2) {
  null !== current && (workInProgress2.dependencies = current.dependencies);
  workInProgressRootSkippedLanes |= workInProgress2.lanes;
  if (0 === (renderLanes2 & workInProgress2.childLanes))
    if (null !== current) {
      if (propagateParentContextChanges(
        current,
        workInProgress2,
        renderLanes2,
        false
      ), 0 === (renderLanes2 & workInProgress2.childLanes))
        return null;
    } else return null;
  if (null !== current && workInProgress2.child !== current.child)
    throw Error(formatProdErrorMessage(153));
  if (null !== workInProgress2.child) {
    current = workInProgress2.child;
    renderLanes2 = createWorkInProgress(current, current.pendingProps);
    workInProgress2.child = renderLanes2;
    for (renderLanes2.return = workInProgress2; null !== current.sibling; )
      current = current.sibling, renderLanes2 = renderLanes2.sibling = createWorkInProgress(current, current.pendingProps), renderLanes2.return = workInProgress2;
    renderLanes2.sibling = null;
  }
  return workInProgress2.child;
}
function checkScheduledUpdateOrContext(current, renderLanes2) {
  if (0 !== (current.lanes & renderLanes2)) return true;
  current = current.dependencies;
  return null !== current && checkIfContextChanged(current) ? true : false;
}
function attemptEarlyBailoutIfNoScheduledUpdate(current, workInProgress2, renderLanes2) {
  switch (workInProgress2.tag) {
    case 3:
      pushHostContainer(workInProgress2, workInProgress2.stateNode.containerInfo);
      pushProvider(workInProgress2, CacheContext, current.memoizedState.cache);
      resetHydrationState();
      break;
    case 27:
    case 5:
      pushHostContext(workInProgress2);
      break;
    case 4:
      pushHostContainer(workInProgress2, workInProgress2.stateNode.containerInfo);
      break;
    case 10:
      pushProvider(
        workInProgress2,
        workInProgress2.type,
        workInProgress2.memoizedProps.value
      );
      break;
    case 13:
      var state = workInProgress2.memoizedState;
      if (null !== state) {
        if (null !== state.dehydrated)
          return pushPrimaryTreeSuspenseHandler(workInProgress2), workInProgress2.flags |= 128, null;
        if (0 !== (renderLanes2 & workInProgress2.child.childLanes))
          return updateSuspenseComponent(current, workInProgress2, renderLanes2);
        pushPrimaryTreeSuspenseHandler(workInProgress2);
        current = bailoutOnAlreadyFinishedWork(
          current,
          workInProgress2,
          renderLanes2
        );
        return null !== current ? current.sibling : null;
      }
      pushPrimaryTreeSuspenseHandler(workInProgress2);
      break;
    case 19:
      var didSuspendBefore = 0 !== (current.flags & 128);
      state = 0 !== (renderLanes2 & workInProgress2.childLanes);
      state || (propagateParentContextChanges(
        current,
        workInProgress2,
        renderLanes2,
        false
      ), state = 0 !== (renderLanes2 & workInProgress2.childLanes));
      if (didSuspendBefore) {
        if (state)
          return updateSuspenseListComponent(
            current,
            workInProgress2,
            renderLanes2
          );
        workInProgress2.flags |= 128;
      }
      didSuspendBefore = workInProgress2.memoizedState;
      null !== didSuspendBefore && (didSuspendBefore.rendering = null, didSuspendBefore.tail = null, didSuspendBefore.lastEffect = null);
      push(suspenseStackCursor, suspenseStackCursor.current);
      if (state) break;
      else return null;
    case 22:
    case 23:
      return workInProgress2.lanes = 0, updateOffscreenComponent(current, workInProgress2, renderLanes2);
    case 24:
      pushProvider(workInProgress2, CacheContext, current.memoizedState.cache);
  }
  return bailoutOnAlreadyFinishedWork(current, workInProgress2, renderLanes2);
}
function beginWork(current, workInProgress2, renderLanes2) {
  if (null !== current)
    if (current.memoizedProps !== workInProgress2.pendingProps)
      didReceiveUpdate = true;
    else {
      if (!checkScheduledUpdateOrContext(current, renderLanes2) && 0 === (workInProgress2.flags & 128))
        return didReceiveUpdate = false, attemptEarlyBailoutIfNoScheduledUpdate(
          current,
          workInProgress2,
          renderLanes2
        );
      didReceiveUpdate = 0 !== (current.flags & 131072) ? true : false;
    }
  else
    didReceiveUpdate = false, isHydrating && 0 !== (workInProgress2.flags & 1048576) && pushTreeId(workInProgress2, treeForkCount, workInProgress2.index);
  workInProgress2.lanes = 0;
  switch (workInProgress2.tag) {
    case 16:
      a: {
        current = workInProgress2.pendingProps;
        var lazyComponent = workInProgress2.elementType, init = lazyComponent._init;
        lazyComponent = init(lazyComponent._payload);
        workInProgress2.type = lazyComponent;
        if ("function" === typeof lazyComponent)
          shouldConstruct(lazyComponent) ? (current = resolveClassComponentProps(lazyComponent, current), workInProgress2.tag = 1, workInProgress2 = updateClassComponent(
            null,
            workInProgress2,
            lazyComponent,
            current,
            renderLanes2
          )) : (workInProgress2.tag = 0, workInProgress2 = updateFunctionComponent(
            null,
            workInProgress2,
            lazyComponent,
            current,
            renderLanes2
          ));
        else {
          if (void 0 !== lazyComponent && null !== lazyComponent) {
            if (init = lazyComponent.$$typeof, init === REACT_FORWARD_REF_TYPE) {
              workInProgress2.tag = 11;
              workInProgress2 = updateForwardRef(
                null,
                workInProgress2,
                lazyComponent,
                current,
                renderLanes2
              );
              break a;
            } else if (init === REACT_MEMO_TYPE) {
              workInProgress2.tag = 14;
              workInProgress2 = updateMemoComponent(
                null,
                workInProgress2,
                lazyComponent,
                current,
                renderLanes2
              );
              break a;
            }
          }
          workInProgress2 = getComponentNameFromType(lazyComponent) || lazyComponent;
          throw Error(formatProdErrorMessage(306, workInProgress2, ""));
        }
      }
      return workInProgress2;
    case 0:
      return updateFunctionComponent(
        current,
        workInProgress2,
        workInProgress2.type,
        workInProgress2.pendingProps,
        renderLanes2
      );
    case 1:
      return lazyComponent = workInProgress2.type, init = resolveClassComponentProps(
        lazyComponent,
        workInProgress2.pendingProps
      ), updateClassComponent(
        current,
        workInProgress2,
        lazyComponent,
        init,
        renderLanes2
      );
    case 3:
      a: {
        pushHostContainer(
          workInProgress2,
          workInProgress2.stateNode.containerInfo
        );
        if (null === current) throw Error(formatProdErrorMessage(387));
        var nextProps = workInProgress2.pendingProps;
        init = workInProgress2.memoizedState;
        lazyComponent = init.element;
        cloneUpdateQueue(current, workInProgress2);
        processUpdateQueue(workInProgress2, nextProps, null, renderLanes2);
        var nextState = workInProgress2.memoizedState;
        nextProps = nextState.cache;
        pushProvider(workInProgress2, CacheContext, nextProps);
        nextProps !== init.cache && propagateContextChanges(
          workInProgress2,
          [CacheContext],
          renderLanes2,
          true
        );
        suspendIfUpdateReadFromEntangledAsyncAction();
        nextProps = nextState.element;
        if (init.isDehydrated)
          if (init = {
            element: nextProps,
            isDehydrated: false,
            cache: nextState.cache
          }, workInProgress2.updateQueue.baseState = init, workInProgress2.memoizedState = init, workInProgress2.flags & 256) {
            workInProgress2 = mountHostRootWithoutHydrating(
              current,
              workInProgress2,
              nextProps,
              renderLanes2
            );
            break a;
          } else if (nextProps !== lazyComponent) {
            lazyComponent = createCapturedValueAtFiber(
              Error(formatProdErrorMessage(424)),
              workInProgress2
            );
            queueHydrationError(lazyComponent);
            workInProgress2 = mountHostRootWithoutHydrating(
              current,
              workInProgress2,
              nextProps,
              renderLanes2
            );
            break a;
          } else
            for (nextHydratableInstance = getNextHydratable(
              workInProgress2.stateNode.containerInfo.firstChild
            ), hydrationParentFiber = workInProgress2, isHydrating = true, hydrationErrors = null, rootOrSingletonContext = true, renderLanes2 = mountChildFibers(
              workInProgress2,
              null,
              nextProps,
              renderLanes2
            ), workInProgress2.child = renderLanes2; renderLanes2; )
              renderLanes2.flags = renderLanes2.flags & -3 | 4096, renderLanes2 = renderLanes2.sibling;
        else {
          resetHydrationState();
          if (nextProps === lazyComponent) {
            workInProgress2 = bailoutOnAlreadyFinishedWork(
              current,
              workInProgress2,
              renderLanes2
            );
            break a;
          }
          reconcileChildren(current, workInProgress2, nextProps, renderLanes2);
        }
        workInProgress2 = workInProgress2.child;
      }
      return workInProgress2;
    case 26:
      return markRef(current, workInProgress2), null === current ? (renderLanes2 = getResource(
        workInProgress2.type,
        null,
        workInProgress2.pendingProps,
        null
      )) ? workInProgress2.memoizedState = renderLanes2 : isHydrating || (renderLanes2 = workInProgress2.type, current = workInProgress2.pendingProps, lazyComponent = getOwnerDocumentFromRootContainer(
        rootInstanceStackCursor.current
      ).createElement(renderLanes2), lazyComponent[internalInstanceKey] = workInProgress2, lazyComponent[internalPropsKey] = current, setInitialProperties(lazyComponent, renderLanes2, current), markNodeAsHoistable(lazyComponent), workInProgress2.stateNode = lazyComponent) : workInProgress2.memoizedState = getResource(
        workInProgress2.type,
        current.memoizedProps,
        workInProgress2.pendingProps,
        current.memoizedState
      ), null;
    case 27:
      return pushHostContext(workInProgress2), null === current && isHydrating && (lazyComponent = workInProgress2.stateNode = resolveSingletonInstance(
        workInProgress2.type,
        workInProgress2.pendingProps,
        rootInstanceStackCursor.current
      ), hydrationParentFiber = workInProgress2, rootOrSingletonContext = true, nextHydratableInstance = getNextHydratable(
        lazyComponent.firstChild
      )), lazyComponent = workInProgress2.pendingProps.children, null !== current || isHydrating ? reconcileChildren(
        current,
        workInProgress2,
        lazyComponent,
        renderLanes2
      ) : workInProgress2.child = reconcileChildFibers(
        workInProgress2,
        null,
        lazyComponent,
        renderLanes2
      ), markRef(current, workInProgress2), workInProgress2.child;
    case 5:
      if (null === current && isHydrating) {
        if (init = lazyComponent = nextHydratableInstance)
          lazyComponent = canHydrateInstance(
            lazyComponent,
            workInProgress2.type,
            workInProgress2.pendingProps,
            rootOrSingletonContext
          ), null !== lazyComponent ? (workInProgress2.stateNode = lazyComponent, hydrationParentFiber = workInProgress2, nextHydratableInstance = getNextHydratable(
            lazyComponent.firstChild
          ), rootOrSingletonContext = false, init = true) : init = false;
        init || throwOnHydrationMismatch(workInProgress2);
      }
      pushHostContext(workInProgress2);
      init = workInProgress2.type;
      nextProps = workInProgress2.pendingProps;
      nextState = null !== current ? current.memoizedProps : null;
      lazyComponent = nextProps.children;
      shouldSetTextContent(init, nextProps) ? lazyComponent = null : null !== nextState && shouldSetTextContent(init, nextState) && (workInProgress2.flags |= 32);
      null !== workInProgress2.memoizedState && (init = renderWithHooks(
        current,
        workInProgress2,
        TransitionAwareHostComponent,
        null,
        null,
        renderLanes2
      ), HostTransitionContext._currentValue = init);
      markRef(current, workInProgress2);
      reconcileChildren(current, workInProgress2, lazyComponent, renderLanes2);
      return workInProgress2.child;
    case 6:
      if (null === current && isHydrating) {
        if (current = renderLanes2 = nextHydratableInstance)
          renderLanes2 = canHydrateTextInstance(
            renderLanes2,
            workInProgress2.pendingProps,
            rootOrSingletonContext
          ), null !== renderLanes2 ? (workInProgress2.stateNode = renderLanes2, hydrationParentFiber = workInProgress2, nextHydratableInstance = null, current = true) : current = false;
        current || throwOnHydrationMismatch(workInProgress2);
      }
      return null;
    case 13:
      return updateSuspenseComponent(current, workInProgress2, renderLanes2);
    case 4:
      return pushHostContainer(
        workInProgress2,
        workInProgress2.stateNode.containerInfo
      ), lazyComponent = workInProgress2.pendingProps, null === current ? workInProgress2.child = reconcileChildFibers(
        workInProgress2,
        null,
        lazyComponent,
        renderLanes2
      ) : reconcileChildren(
        current,
        workInProgress2,
        lazyComponent,
        renderLanes2
      ), workInProgress2.child;
    case 11:
      return updateForwardRef(
        current,
        workInProgress2,
        workInProgress2.type,
        workInProgress2.pendingProps,
        renderLanes2
      );
    case 7:
      return reconcileChildren(
        current,
        workInProgress2,
        workInProgress2.pendingProps,
        renderLanes2
      ), workInProgress2.child;
    case 8:
      return reconcileChildren(
        current,
        workInProgress2,
        workInProgress2.pendingProps.children,
        renderLanes2
      ), workInProgress2.child;
    case 12:
      return reconcileChildren(
        current,
        workInProgress2,
        workInProgress2.pendingProps.children,
        renderLanes2
      ), workInProgress2.child;
    case 10:
      return lazyComponent = workInProgress2.pendingProps, pushProvider(workInProgress2, workInProgress2.type, lazyComponent.value), reconcileChildren(
        current,
        workInProgress2,
        lazyComponent.children,
        renderLanes2
      ), workInProgress2.child;
    case 9:
      return init = workInProgress2.type._context, lazyComponent = workInProgress2.pendingProps.children, prepareToReadContext(workInProgress2), init = readContext(init), lazyComponent = lazyComponent(init), workInProgress2.flags |= 1, reconcileChildren(current, workInProgress2, lazyComponent, renderLanes2), workInProgress2.child;
    case 14:
      return updateMemoComponent(
        current,
        workInProgress2,
        workInProgress2.type,
        workInProgress2.pendingProps,
        renderLanes2
      );
    case 15:
      return updateSimpleMemoComponent(
        current,
        workInProgress2,
        workInProgress2.type,
        workInProgress2.pendingProps,
        renderLanes2
      );
    case 19:
      return updateSuspenseListComponent(current, workInProgress2, renderLanes2);
    case 22:
      return updateOffscreenComponent(current, workInProgress2, renderLanes2);
    case 24:
      return prepareToReadContext(workInProgress2), lazyComponent = readContext(CacheContext), null === current ? (init = peekCacheFromPool(), null === init && (init = workInProgressRoot, nextProps = createCache(), init.pooledCache = nextProps, nextProps.refCount++, null !== nextProps && (init.pooledCacheLanes |= renderLanes2), init = nextProps), workInProgress2.memoizedState = {
        parent: lazyComponent,
        cache: init
      }, initializeUpdateQueue(workInProgress2), pushProvider(workInProgress2, CacheContext, init)) : (0 !== (current.lanes & renderLanes2) && (cloneUpdateQueue(current, workInProgress2), processUpdateQueue(workInProgress2, null, null, renderLanes2), suspendIfUpdateReadFromEntangledAsyncAction()), init = current.memoizedState, nextProps = workInProgress2.memoizedState, init.parent !== lazyComponent ? (init = { parent: lazyComponent, cache: lazyComponent }, workInProgress2.memoizedState = init, 0 === workInProgress2.lanes && (workInProgress2.memoizedState = workInProgress2.updateQueue.baseState = init), pushProvider(workInProgress2, CacheContext, lazyComponent)) : (lazyComponent = nextProps.cache, pushProvider(workInProgress2, CacheContext, lazyComponent), lazyComponent !== init.cache && propagateContextChanges(
        workInProgress2,
        [CacheContext],
        renderLanes2,
        true
      ))), reconcileChildren(
        current,
        workInProgress2,
        workInProgress2.pendingProps.children,
        renderLanes2
      ), workInProgress2.child;
    case 29:
      throw workInProgress2.pendingProps;
  }
  throw Error(formatProdErrorMessage(156, workInProgress2.tag));
}
var valueCursor = createCursor(null), currentlyRenderingFiber = null, lastContextDependency = null;
function pushProvider(providerFiber, context, nextValue) {
  push(valueCursor, context._currentValue);
  context._currentValue = nextValue;
}
function popProvider(context) {
  context._currentValue = valueCursor.current;
  pop(valueCursor);
}
function scheduleContextWorkOnParentPath(parent, renderLanes2, propagationRoot) {
  for (; null !== parent; ) {
    var alternate = parent.alternate;
    (parent.childLanes & renderLanes2) !== renderLanes2 ? (parent.childLanes |= renderLanes2, null !== alternate && (alternate.childLanes |= renderLanes2)) : null !== alternate && (alternate.childLanes & renderLanes2) !== renderLanes2 && (alternate.childLanes |= renderLanes2);
    if (parent === propagationRoot) break;
    parent = parent.return;
  }
}
function propagateContextChanges(workInProgress2, contexts, renderLanes2, forcePropagateEntireTree) {
  var fiber = workInProgress2.child;
  null !== fiber && (fiber.return = workInProgress2);
  for (; null !== fiber; ) {
    var list = fiber.dependencies;
    if (null !== list) {
      var nextFiber = fiber.child;
      list = list.firstContext;
      a: for (; null !== list; ) {
        var dependency = list;
        list = fiber;
        for (var i = 0; i < contexts.length; i++)
          if (dependency.context === contexts[i]) {
            list.lanes |= renderLanes2;
            dependency = list.alternate;
            null !== dependency && (dependency.lanes |= renderLanes2);
            scheduleContextWorkOnParentPath(
              list.return,
              renderLanes2,
              workInProgress2
            );
            forcePropagateEntireTree || (nextFiber = null);
            break a;
          }
        list = dependency.next;
      }
    } else if (18 === fiber.tag) {
      nextFiber = fiber.return;
      if (null === nextFiber) throw Error(formatProdErrorMessage(341));
      nextFiber.lanes |= renderLanes2;
      list = nextFiber.alternate;
      null !== list && (list.lanes |= renderLanes2);
      scheduleContextWorkOnParentPath(nextFiber, renderLanes2, workInProgress2);
      nextFiber = null;
    } else nextFiber = fiber.child;
    if (null !== nextFiber) nextFiber.return = fiber;
    else
      for (nextFiber = fiber; null !== nextFiber; ) {
        if (nextFiber === workInProgress2) {
          nextFiber = null;
          break;
        }
        fiber = nextFiber.sibling;
        if (null !== fiber) {
          fiber.return = nextFiber.return;
          nextFiber = fiber;
          break;
        }
        nextFiber = nextFiber.return;
      }
    fiber = nextFiber;
  }
}
function propagateParentContextChanges(current, workInProgress2, renderLanes2, forcePropagateEntireTree) {
  current = null;
  for (var parent = workInProgress2, isInsidePropagationBailout = false; null !== parent; ) {
    if (!isInsidePropagationBailout) {
      if (0 !== (parent.flags & 524288)) isInsidePropagationBailout = true;
      else if (0 !== (parent.flags & 262144)) break;
    }
    if (10 === parent.tag) {
      var currentParent = parent.alternate;
      if (null === currentParent) throw Error(formatProdErrorMessage(387));
      currentParent = currentParent.memoizedProps;
      if (null !== currentParent) {
        var context = parent.type;
        objectIs(parent.pendingProps.value, currentParent.value) || (null !== current ? current.push(context) : current = [context]);
      }
    } else if (parent === hostTransitionProviderCursor.current) {
      currentParent = parent.alternate;
      if (null === currentParent) throw Error(formatProdErrorMessage(387));
      currentParent.memoizedState.memoizedState !== parent.memoizedState.memoizedState && (null !== current ? current.push(HostTransitionContext) : current = [HostTransitionContext]);
    }
    parent = parent.return;
  }
  null !== current && propagateContextChanges(
    workInProgress2,
    current,
    renderLanes2,
    forcePropagateEntireTree
  );
  workInProgress2.flags |= 262144;
}
function checkIfContextChanged(currentDependencies) {
  for (currentDependencies = currentDependencies.firstContext; null !== currentDependencies; ) {
    if (!objectIs(
      currentDependencies.context._currentValue,
      currentDependencies.memoizedValue
    ))
      return true;
    currentDependencies = currentDependencies.next;
  }
  return false;
}
function prepareToReadContext(workInProgress2) {
  currentlyRenderingFiber = workInProgress2;
  lastContextDependency = null;
  workInProgress2 = workInProgress2.dependencies;
  null !== workInProgress2 && (workInProgress2.firstContext = null);
}
function readContext(context) {
  return readContextForConsumer(currentlyRenderingFiber, context);
}
function readContextDuringReconciliation(consumer, context) {
  null === currentlyRenderingFiber && prepareToReadContext(consumer);
  return readContextForConsumer(consumer, context);
}
function readContextForConsumer(consumer, context) {
  var value = context._currentValue;
  context = { context, memoizedValue: value, next: null };
  if (null === lastContextDependency) {
    if (null === consumer) throw Error(formatProdErrorMessage(308));
    lastContextDependency = context;
    consumer.dependencies = { lanes: 0, firstContext: context };
    consumer.flags |= 524288;
  } else lastContextDependency = lastContextDependency.next = context;
  return value;
}
var hasForceUpdate = false;
function initializeUpdateQueue(fiber) {
  fiber.updateQueue = {
    baseState: fiber.memoizedState,
    firstBaseUpdate: null,
    lastBaseUpdate: null,
    shared: { pending: null, lanes: 0, hiddenCallbacks: null },
    callbacks: null
  };
}
function cloneUpdateQueue(current, workInProgress2) {
  current = current.updateQueue;
  workInProgress2.updateQueue === current && (workInProgress2.updateQueue = {
    baseState: current.baseState,
    firstBaseUpdate: current.firstBaseUpdate,
    lastBaseUpdate: current.lastBaseUpdate,
    shared: current.shared,
    callbacks: null
  });
}
function createUpdate(lane) {
  return { lane, tag: 0, payload: null, callback: null, next: null };
}
function enqueueUpdate(fiber, update, lane) {
  var updateQueue = fiber.updateQueue;
  if (null === updateQueue) return null;
  updateQueue = updateQueue.shared;
  if (0 !== (executionContext & 2)) {
    var pending = updateQueue.pending;
    null === pending ? update.next = update : (update.next = pending.next, pending.next = update);
    updateQueue.pending = update;
    update = getRootForUpdatedFiber(fiber);
    markUpdateLaneFromFiberToRoot(fiber, null, lane);
    return update;
  }
  enqueueUpdate$1(fiber, updateQueue, update, lane);
  return getRootForUpdatedFiber(fiber);
}
function entangleTransitions(root2, fiber, lane) {
  fiber = fiber.updateQueue;
  if (null !== fiber && (fiber = fiber.shared, 0 !== (lane & 4194176))) {
    var queueLanes = fiber.lanes;
    queueLanes &= root2.pendingLanes;
    lane |= queueLanes;
    fiber.lanes = lane;
    markRootEntangled(root2, lane);
  }
}
function enqueueCapturedUpdate(workInProgress2, capturedUpdate) {
  var queue = workInProgress2.updateQueue, current = workInProgress2.alternate;
  if (null !== current && (current = current.updateQueue, queue === current)) {
    var newFirst = null, newLast = null;
    queue = queue.firstBaseUpdate;
    if (null !== queue) {
      do {
        var clone = {
          lane: queue.lane,
          tag: queue.tag,
          payload: queue.payload,
          callback: null,
          next: null
        };
        null === newLast ? newFirst = newLast = clone : newLast = newLast.next = clone;
        queue = queue.next;
      } while (null !== queue);
      null === newLast ? newFirst = newLast = capturedUpdate : newLast = newLast.next = capturedUpdate;
    } else newFirst = newLast = capturedUpdate;
    queue = {
      baseState: current.baseState,
      firstBaseUpdate: newFirst,
      lastBaseUpdate: newLast,
      shared: current.shared,
      callbacks: current.callbacks
    };
    workInProgress2.updateQueue = queue;
    return;
  }
  workInProgress2 = queue.lastBaseUpdate;
  null === workInProgress2 ? queue.firstBaseUpdate = capturedUpdate : workInProgress2.next = capturedUpdate;
  queue.lastBaseUpdate = capturedUpdate;
}
var didReadFromEntangledAsyncAction = false;
function suspendIfUpdateReadFromEntangledAsyncAction() {
  if (didReadFromEntangledAsyncAction) {
    var entangledActionThenable = currentEntangledActionThenable;
    if (null !== entangledActionThenable) throw entangledActionThenable;
  }
}
function processUpdateQueue(workInProgress$jscomp$0, props, instance$jscomp$0, renderLanes2) {
  didReadFromEntangledAsyncAction = false;
  var queue = workInProgress$jscomp$0.updateQueue;
  hasForceUpdate = false;
  var firstBaseUpdate = queue.firstBaseUpdate, lastBaseUpdate = queue.lastBaseUpdate, pendingQueue = queue.shared.pending;
  if (null !== pendingQueue) {
    queue.shared.pending = null;
    var lastPendingUpdate = pendingQueue, firstPendingUpdate = lastPendingUpdate.next;
    lastPendingUpdate.next = null;
    null === lastBaseUpdate ? firstBaseUpdate = firstPendingUpdate : lastBaseUpdate.next = firstPendingUpdate;
    lastBaseUpdate = lastPendingUpdate;
    var current = workInProgress$jscomp$0.alternate;
    null !== current && (current = current.updateQueue, pendingQueue = current.lastBaseUpdate, pendingQueue !== lastBaseUpdate && (null === pendingQueue ? current.firstBaseUpdate = firstPendingUpdate : pendingQueue.next = firstPendingUpdate, current.lastBaseUpdate = lastPendingUpdate));
  }
  if (null !== firstBaseUpdate) {
    var newState = queue.baseState;
    lastBaseUpdate = 0;
    current = firstPendingUpdate = lastPendingUpdate = null;
    pendingQueue = firstBaseUpdate;
    do {
      var updateLane = pendingQueue.lane & -536870913, isHiddenUpdate = updateLane !== pendingQueue.lane;
      if (isHiddenUpdate ? (workInProgressRootRenderLanes & updateLane) === updateLane : (renderLanes2 & updateLane) === updateLane) {
        0 !== updateLane && updateLane === currentEntangledLane && (didReadFromEntangledAsyncAction = true);
        null !== current && (current = current.next = {
          lane: 0,
          tag: pendingQueue.tag,
          payload: pendingQueue.payload,
          callback: null,
          next: null
        });
        a: {
          var workInProgress2 = workInProgress$jscomp$0, update = pendingQueue;
          updateLane = props;
          var instance = instance$jscomp$0;
          switch (update.tag) {
            case 1:
              workInProgress2 = update.payload;
              if ("function" === typeof workInProgress2) {
                newState = workInProgress2.call(instance, newState, updateLane);
                break a;
              }
              newState = workInProgress2;
              break a;
            case 3:
              workInProgress2.flags = workInProgress2.flags & -65537 | 128;
            case 0:
              workInProgress2 = update.payload;
              updateLane = "function" === typeof workInProgress2 ? workInProgress2.call(instance, newState, updateLane) : workInProgress2;
              if (null === updateLane || void 0 === updateLane) break a;
              newState = assign({}, newState, updateLane);
              break a;
            case 2:
              hasForceUpdate = true;
          }
        }
        updateLane = pendingQueue.callback;
        null !== updateLane && (workInProgress$jscomp$0.flags |= 64, isHiddenUpdate && (workInProgress$jscomp$0.flags |= 8192), isHiddenUpdate = queue.callbacks, null === isHiddenUpdate ? queue.callbacks = [updateLane] : isHiddenUpdate.push(updateLane));
      } else
        isHiddenUpdate = {
          lane: updateLane,
          tag: pendingQueue.tag,
          payload: pendingQueue.payload,
          callback: pendingQueue.callback,
          next: null
        }, null === current ? (firstPendingUpdate = current = isHiddenUpdate, lastPendingUpdate = newState) : current = current.next = isHiddenUpdate, lastBaseUpdate |= updateLane;
      pendingQueue = pendingQueue.next;
      if (null === pendingQueue)
        if (pendingQueue = queue.shared.pending, null === pendingQueue)
          break;
        else
          isHiddenUpdate = pendingQueue, pendingQueue = isHiddenUpdate.next, isHiddenUpdate.next = null, queue.lastBaseUpdate = isHiddenUpdate, queue.shared.pending = null;
    } while (1);
    null === current && (lastPendingUpdate = newState);
    queue.baseState = lastPendingUpdate;
    queue.firstBaseUpdate = firstPendingUpdate;
    queue.lastBaseUpdate = current;
    null === firstBaseUpdate && (queue.shared.lanes = 0);
    workInProgressRootSkippedLanes |= lastBaseUpdate;
    workInProgress$jscomp$0.lanes = lastBaseUpdate;
    workInProgress$jscomp$0.memoizedState = newState;
  }
}
function callCallback(callback, context) {
  if ("function" !== typeof callback)
    throw Error(formatProdErrorMessage(191, callback));
  callback.call(context);
}
function commitCallbacks(updateQueue, context) {
  var callbacks = updateQueue.callbacks;
  if (null !== callbacks)
    for (updateQueue.callbacks = null, updateQueue = 0; updateQueue < callbacks.length; updateQueue++)
      callCallback(callbacks[updateQueue], context);
}
function commitHookEffectListMount(flags, finishedWork) {
  try {
    var updateQueue = finishedWork.updateQueue, lastEffect = null !== updateQueue ? updateQueue.lastEffect : null;
    if (null !== lastEffect) {
      var firstEffect = lastEffect.next;
      updateQueue = firstEffect;
      do {
        if ((updateQueue.tag & flags) === flags) {
          lastEffect = void 0;
          var create = updateQueue.create, inst = updateQueue.inst;
          lastEffect = create();
          inst.destroy = lastEffect;
        }
        updateQueue = updateQueue.next;
      } while (updateQueue !== firstEffect);
    }
  } catch (error) {
    captureCommitPhaseError(finishedWork, finishedWork.return, error);
  }
}
function commitHookEffectListUnmount(flags, finishedWork, nearestMountedAncestor$jscomp$0) {
  try {
    var updateQueue = finishedWork.updateQueue, lastEffect = null !== updateQueue ? updateQueue.lastEffect : null;
    if (null !== lastEffect) {
      var firstEffect = lastEffect.next;
      updateQueue = firstEffect;
      do {
        if ((updateQueue.tag & flags) === flags) {
          var inst = updateQueue.inst, destroy = inst.destroy;
          if (void 0 !== destroy) {
            inst.destroy = void 0;
            lastEffect = finishedWork;
            var nearestMountedAncestor = nearestMountedAncestor$jscomp$0;
            try {
              destroy();
            } catch (error) {
              captureCommitPhaseError(
                lastEffect,
                nearestMountedAncestor,
                error
              );
            }
          }
        }
        updateQueue = updateQueue.next;
      } while (updateQueue !== firstEffect);
    }
  } catch (error) {
    captureCommitPhaseError(finishedWork, finishedWork.return, error);
  }
}
function commitClassCallbacks(finishedWork) {
  var updateQueue = finishedWork.updateQueue;
  if (null !== updateQueue) {
    var instance = finishedWork.stateNode;
    try {
      commitCallbacks(updateQueue, instance);
    } catch (error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, error);
    }
  }
}
function safelyCallComponentWillUnmount(current, nearestMountedAncestor, instance) {
  instance.props = resolveClassComponentProps(
    current.type,
    current.memoizedProps
  );
  instance.state = current.memoizedState;
  try {
    instance.componentWillUnmount();
  } catch (error) {
    captureCommitPhaseError(current, nearestMountedAncestor, error);
  }
}
function safelyAttachRef(current, nearestMountedAncestor) {
  try {
    var ref = current.ref;
    if (null !== ref) {
      var instance = current.stateNode;
      switch (current.tag) {
        case 26:
        case 27:
        case 5:
          var instanceToUse = instance;
          break;
        default:
          instanceToUse = instance;
      }
      "function" === typeof ref ? current.refCleanup = ref(instanceToUse) : ref.current = instanceToUse;
    }
  } catch (error) {
    captureCommitPhaseError(current, nearestMountedAncestor, error);
  }
}
function safelyDetachRef(current, nearestMountedAncestor) {
  var ref = current.ref, refCleanup = current.refCleanup;
  if (null !== ref)
    if ("function" === typeof refCleanup)
      try {
        refCleanup();
      } catch (error) {
        captureCommitPhaseError(current, nearestMountedAncestor, error);
      } finally {
        current.refCleanup = null, current = current.alternate, null != current && (current.refCleanup = null);
      }
    else if ("function" === typeof ref)
      try {
        ref(null);
      } catch (error$112) {
        captureCommitPhaseError(current, nearestMountedAncestor, error$112);
      }
    else ref.current = null;
}
function commitHostMount(finishedWork) {
  var type = finishedWork.type, props = finishedWork.memoizedProps, instance = finishedWork.stateNode;
  try {
    a: switch (type) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        props.autoFocus && instance.focus();
        break a;
      case "img":
        props.src ? instance.src = props.src : props.srcSet && (instance.srcset = props.srcSet);
    }
  } catch (error) {
    captureCommitPhaseError(finishedWork, finishedWork.return, error);
  }
}
function commitHostUpdate(finishedWork, newProps, oldProps) {
  try {
    var domElement = finishedWork.stateNode;
    updateProperties(domElement, finishedWork.type, oldProps, newProps);
    domElement[internalPropsKey] = newProps;
  } catch (error) {
    captureCommitPhaseError(finishedWork, finishedWork.return, error);
  }
}
function isHostParent(fiber) {
  return 5 === fiber.tag || 3 === fiber.tag || 26 === fiber.tag || 27 === fiber.tag || 4 === fiber.tag;
}
function getHostSibling(fiber) {
  a: for (; ; ) {
    for (; null === fiber.sibling; ) {
      if (null === fiber.return || isHostParent(fiber.return)) return null;
      fiber = fiber.return;
    }
    fiber.sibling.return = fiber.return;
    for (fiber = fiber.sibling; 5 !== fiber.tag && 6 !== fiber.tag && 27 !== fiber.tag && 18 !== fiber.tag; ) {
      if (fiber.flags & 2) continue a;
      if (null === fiber.child || 4 === fiber.tag) continue a;
      else fiber.child.return = fiber, fiber = fiber.child;
    }
    if (!(fiber.flags & 2)) return fiber.stateNode;
  }
}
function insertOrAppendPlacementNodeIntoContainer(node, before, parent) {
  var tag = node.tag;
  if (5 === tag || 6 === tag)
    node = node.stateNode, before ? 8 === parent.nodeType ? parent.parentNode.insertBefore(node, before) : parent.insertBefore(node, before) : (8 === parent.nodeType ? (before = parent.parentNode, before.insertBefore(node, parent)) : (before = parent, before.appendChild(node)), parent = parent._reactRootContainer, null !== parent && void 0 !== parent || null !== before.onclick || (before.onclick = noop$1));
  else if (4 !== tag && 27 !== tag && (node = node.child, null !== node))
    for (insertOrAppendPlacementNodeIntoContainer(node, before, parent), node = node.sibling; null !== node; )
      insertOrAppendPlacementNodeIntoContainer(node, before, parent), node = node.sibling;
}
function insertOrAppendPlacementNode(node, before, parent) {
  var tag = node.tag;
  if (5 === tag || 6 === tag)
    node = node.stateNode, before ? parent.insertBefore(node, before) : parent.appendChild(node);
  else if (4 !== tag && 27 !== tag && (node = node.child, null !== node))
    for (insertOrAppendPlacementNode(node, before, parent), node = node.sibling; null !== node; )
      insertOrAppendPlacementNode(node, before, parent), node = node.sibling;
}
var offscreenSubtreeIsHidden = false, offscreenSubtreeWasHidden = false, needsFormReset = false, PossiblyWeakSet = "function" === typeof WeakSet ? WeakSet : Set, nextEffect = null, shouldFireAfterActiveInstanceBlur = false;
function commitBeforeMutationEffects(root2, firstChild) {
  root2 = root2.containerInfo;
  eventsEnabled = _enabled;
  root2 = getActiveElementDeep(root2);
  if (hasSelectionCapabilities(root2)) {
    if ("selectionStart" in root2)
      var JSCompiler_temp = {
        start: root2.selectionStart,
        end: root2.selectionEnd
      };
    else
      a: {
        JSCompiler_temp = (JSCompiler_temp = root2.ownerDocument) && JSCompiler_temp.defaultView || window;
        var selection = JSCompiler_temp.getSelection && JSCompiler_temp.getSelection();
        if (selection && 0 !== selection.rangeCount) {
          JSCompiler_temp = selection.anchorNode;
          var anchorOffset = selection.anchorOffset, focusNode = selection.focusNode;
          selection = selection.focusOffset;
          try {
            JSCompiler_temp.nodeType, focusNode.nodeType;
          } catch (e$20) {
            JSCompiler_temp = null;
            break a;
          }
          var length = 0, start = -1, end = -1, indexWithinAnchor = 0, indexWithinFocus = 0, node = root2, parentNode = null;
          b: for (; ; ) {
            for (var next; ; ) {
              node !== JSCompiler_temp || 0 !== anchorOffset && 3 !== node.nodeType || (start = length + anchorOffset);
              node !== focusNode || 0 !== selection && 3 !== node.nodeType || (end = length + selection);
              3 === node.nodeType && (length += node.nodeValue.length);
              if (null === (next = node.firstChild)) break;
              parentNode = node;
              node = next;
            }
            for (; ; ) {
              if (node === root2) break b;
              parentNode === JSCompiler_temp && ++indexWithinAnchor === anchorOffset && (start = length);
              parentNode === focusNode && ++indexWithinFocus === selection && (end = length);
              if (null !== (next = node.nextSibling)) break;
              node = parentNode;
              parentNode = node.parentNode;
            }
            node = next;
          }
          JSCompiler_temp = -1 === start || -1 === end ? null : { start, end };
        } else JSCompiler_temp = null;
      }
    JSCompiler_temp = JSCompiler_temp || { start: 0, end: 0 };
  } else JSCompiler_temp = null;
  selectionInformation = { focusedElem: root2, selectionRange: JSCompiler_temp };
  _enabled = false;
  for (nextEffect = firstChild; null !== nextEffect; )
    if (firstChild = nextEffect, root2 = firstChild.child, 0 !== (firstChild.subtreeFlags & 1028) && null !== root2)
      root2.return = firstChild, nextEffect = root2;
    else
      for (; null !== nextEffect; ) {
        firstChild = nextEffect;
        focusNode = firstChild.alternate;
        root2 = firstChild.flags;
        switch (firstChild.tag) {
          case 0:
            break;
          case 11:
          case 15:
            break;
          case 1:
            if (0 !== (root2 & 1024) && null !== focusNode) {
              root2 = void 0;
              JSCompiler_temp = firstChild;
              anchorOffset = focusNode.memoizedProps;
              focusNode = focusNode.memoizedState;
              selection = JSCompiler_temp.stateNode;
              try {
                var resolvedPrevProps = resolveClassComponentProps(
                  JSCompiler_temp.type,
                  anchorOffset,
                  JSCompiler_temp.elementType === JSCompiler_temp.type
                );
                root2 = selection.getSnapshotBeforeUpdate(
                  resolvedPrevProps,
                  focusNode
                );
                selection.__reactInternalSnapshotBeforeUpdate = root2;
              } catch (error) {
                captureCommitPhaseError(
                  JSCompiler_temp,
                  JSCompiler_temp.return,
                  error
                );
              }
            }
            break;
          case 3:
            if (0 !== (root2 & 1024)) {
              if (root2 = firstChild.stateNode.containerInfo, JSCompiler_temp = root2.nodeType, 9 === JSCompiler_temp)
                clearContainerSparingly(root2);
              else if (1 === JSCompiler_temp)
                switch (root2.nodeName) {
                  case "HEAD":
                  case "HTML":
                  case "BODY":
                    clearContainerSparingly(root2);
                    break;
                  default:
                    root2.textContent = "";
                }
            }
            break;
          case 5:
          case 26:
          case 27:
          case 6:
          case 4:
          case 17:
            break;
          default:
            if (0 !== (root2 & 1024)) throw Error(formatProdErrorMessage(163));
        }
        root2 = firstChild.sibling;
        if (null !== root2) {
          root2.return = firstChild.return;
          nextEffect = root2;
          break;
        }
        nextEffect = firstChild.return;
      }
  resolvedPrevProps = shouldFireAfterActiveInstanceBlur;
  shouldFireAfterActiveInstanceBlur = false;
  return resolvedPrevProps;
}
function commitLayoutEffectOnFiber(finishedRoot, current, finishedWork) {
  var flags = finishedWork.flags;
  switch (finishedWork.tag) {
    case 0:
    case 11:
    case 15:
      recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
      flags & 4 && commitHookEffectListMount(5, finishedWork);
      break;
    case 1:
      recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
      if (flags & 4)
        if (finishedRoot = finishedWork.stateNode, null === current)
          try {
            finishedRoot.componentDidMount();
          } catch (error) {
            captureCommitPhaseError(finishedWork, finishedWork.return, error);
          }
        else {
          var prevProps = resolveClassComponentProps(
            finishedWork.type,
            current.memoizedProps
          );
          current = current.memoizedState;
          try {
            finishedRoot.componentDidUpdate(
              prevProps,
              current,
              finishedRoot.__reactInternalSnapshotBeforeUpdate
            );
          } catch (error$111) {
            captureCommitPhaseError(
              finishedWork,
              finishedWork.return,
              error$111
            );
          }
        }
      flags & 64 && commitClassCallbacks(finishedWork);
      flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
      break;
    case 3:
      recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
      if (flags & 64 && (flags = finishedWork.updateQueue, null !== flags)) {
        finishedRoot = null;
        if (null !== finishedWork.child)
          switch (finishedWork.child.tag) {
            case 27:
            case 5:
              finishedRoot = finishedWork.child.stateNode;
              break;
            case 1:
              finishedRoot = finishedWork.child.stateNode;
          }
        try {
          commitCallbacks(flags, finishedRoot);
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
      break;
    case 26:
      recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
      flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
      break;
    case 27:
    case 5:
      recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
      null === current && flags & 4 && commitHostMount(finishedWork);
      flags & 512 && safelyAttachRef(finishedWork, finishedWork.return);
      break;
    case 12:
      recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
      break;
    case 13:
      recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
      flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
      break;
    case 22:
      prevProps = null !== finishedWork.memoizedState || offscreenSubtreeIsHidden;
      if (!prevProps) {
        current = null !== current && null !== current.memoizedState || offscreenSubtreeWasHidden;
        var prevOffscreenSubtreeIsHidden = offscreenSubtreeIsHidden, prevOffscreenSubtreeWasHidden = offscreenSubtreeWasHidden;
        offscreenSubtreeIsHidden = prevProps;
        (offscreenSubtreeWasHidden = current) && !prevOffscreenSubtreeWasHidden ? recursivelyTraverseReappearLayoutEffects(
          finishedRoot,
          finishedWork,
          0 !== (finishedWork.subtreeFlags & 8772)
        ) : recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
        offscreenSubtreeIsHidden = prevOffscreenSubtreeIsHidden;
        offscreenSubtreeWasHidden = prevOffscreenSubtreeWasHidden;
      }
      flags & 512 && ("manual" === finishedWork.memoizedProps.mode ? safelyAttachRef(finishedWork, finishedWork.return) : safelyDetachRef(finishedWork, finishedWork.return));
      break;
    default:
      recursivelyTraverseLayoutEffects(finishedRoot, finishedWork);
  }
}
function detachFiberAfterEffects(fiber) {
  var alternate = fiber.alternate;
  null !== alternate && (fiber.alternate = null, detachFiberAfterEffects(alternate));
  fiber.child = null;
  fiber.deletions = null;
  fiber.sibling = null;
  5 === fiber.tag && (alternate = fiber.stateNode, null !== alternate && detachDeletedInstance(alternate));
  fiber.stateNode = null;
  fiber.return = null;
  fiber.dependencies = null;
  fiber.memoizedProps = null;
  fiber.memoizedState = null;
  fiber.pendingProps = null;
  fiber.stateNode = null;
  fiber.updateQueue = null;
}
var hostParent = null, hostParentIsContainer = false;
function recursivelyTraverseDeletionEffects(finishedRoot, nearestMountedAncestor, parent) {
  for (parent = parent.child; null !== parent; )
    commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, parent), parent = parent.sibling;
}
function commitDeletionEffectsOnFiber(finishedRoot, nearestMountedAncestor, deletedFiber) {
  if (injectedHook && "function" === typeof injectedHook.onCommitFiberUnmount)
    try {
      injectedHook.onCommitFiberUnmount(rendererID, deletedFiber);
    } catch (err) {
    }
  switch (deletedFiber.tag) {
    case 26:
      offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
      recursivelyTraverseDeletionEffects(
        finishedRoot,
        nearestMountedAncestor,
        deletedFiber
      );
      deletedFiber.memoizedState ? deletedFiber.memoizedState.count-- : deletedFiber.stateNode && (deletedFiber = deletedFiber.stateNode, deletedFiber.parentNode.removeChild(deletedFiber));
      break;
    case 27:
      offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
      var prevHostParent = hostParent, prevHostParentIsContainer = hostParentIsContainer;
      hostParent = deletedFiber.stateNode;
      recursivelyTraverseDeletionEffects(
        finishedRoot,
        nearestMountedAncestor,
        deletedFiber
      );
      deletedFiber = deletedFiber.stateNode;
      for (nearestMountedAncestor = deletedFiber.attributes; nearestMountedAncestor.length; )
        deletedFiber.removeAttributeNode(nearestMountedAncestor[0]);
      detachDeletedInstance(deletedFiber);
      hostParent = prevHostParent;
      hostParentIsContainer = prevHostParentIsContainer;
      break;
    case 5:
      offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
    case 6:
      prevHostParentIsContainer = hostParent;
      var prevHostParentIsContainer$119 = hostParentIsContainer;
      hostParent = null;
      recursivelyTraverseDeletionEffects(
        finishedRoot,
        nearestMountedAncestor,
        deletedFiber
      );
      hostParent = prevHostParentIsContainer;
      hostParentIsContainer = prevHostParentIsContainer$119;
      if (null !== hostParent)
        if (hostParentIsContainer)
          try {
            finishedRoot = hostParent, prevHostParent = deletedFiber.stateNode, 8 === finishedRoot.nodeType ? finishedRoot.parentNode.removeChild(prevHostParent) : finishedRoot.removeChild(prevHostParent);
          } catch (error) {
            captureCommitPhaseError(
              deletedFiber,
              nearestMountedAncestor,
              error
            );
          }
        else
          try {
            hostParent.removeChild(deletedFiber.stateNode);
          } catch (error) {
            captureCommitPhaseError(
              deletedFiber,
              nearestMountedAncestor,
              error
            );
          }
      break;
    case 18:
      null !== hostParent && (hostParentIsContainer ? (nearestMountedAncestor = hostParent, deletedFiber = deletedFiber.stateNode, 8 === nearestMountedAncestor.nodeType ? clearSuspenseBoundary(
        nearestMountedAncestor.parentNode,
        deletedFiber
      ) : 1 === nearestMountedAncestor.nodeType && clearSuspenseBoundary(nearestMountedAncestor, deletedFiber), retryIfBlockedOn(nearestMountedAncestor)) : clearSuspenseBoundary(hostParent, deletedFiber.stateNode));
      break;
    case 4:
      prevHostParent = hostParent;
      prevHostParentIsContainer = hostParentIsContainer;
      hostParent = deletedFiber.stateNode.containerInfo;
      hostParentIsContainer = true;
      recursivelyTraverseDeletionEffects(
        finishedRoot,
        nearestMountedAncestor,
        deletedFiber
      );
      hostParent = prevHostParent;
      hostParentIsContainer = prevHostParentIsContainer;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      offscreenSubtreeWasHidden || commitHookEffectListUnmount(2, deletedFiber, nearestMountedAncestor);
      offscreenSubtreeWasHidden || commitHookEffectListUnmount(4, deletedFiber, nearestMountedAncestor);
      recursivelyTraverseDeletionEffects(
        finishedRoot,
        nearestMountedAncestor,
        deletedFiber
      );
      break;
    case 1:
      offscreenSubtreeWasHidden || (safelyDetachRef(deletedFiber, nearestMountedAncestor), prevHostParent = deletedFiber.stateNode, "function" === typeof prevHostParent.componentWillUnmount && safelyCallComponentWillUnmount(
        deletedFiber,
        nearestMountedAncestor,
        prevHostParent
      ));
      recursivelyTraverseDeletionEffects(
        finishedRoot,
        nearestMountedAncestor,
        deletedFiber
      );
      break;
    case 21:
      recursivelyTraverseDeletionEffects(
        finishedRoot,
        nearestMountedAncestor,
        deletedFiber
      );
      break;
    case 22:
      offscreenSubtreeWasHidden || safelyDetachRef(deletedFiber, nearestMountedAncestor);
      offscreenSubtreeWasHidden = (prevHostParent = offscreenSubtreeWasHidden) || null !== deletedFiber.memoizedState;
      recursivelyTraverseDeletionEffects(
        finishedRoot,
        nearestMountedAncestor,
        deletedFiber
      );
      offscreenSubtreeWasHidden = prevHostParent;
      break;
    default:
      recursivelyTraverseDeletionEffects(
        finishedRoot,
        nearestMountedAncestor,
        deletedFiber
      );
  }
}
function commitSuspenseHydrationCallbacks(finishedRoot, finishedWork) {
  if (null === finishedWork.memoizedState && (finishedRoot = finishedWork.alternate, null !== finishedRoot && (finishedRoot = finishedRoot.memoizedState, null !== finishedRoot && (finishedRoot = finishedRoot.dehydrated, null !== finishedRoot))))
    try {
      retryIfBlockedOn(finishedRoot);
    } catch (error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, error);
    }
}
function getRetryCache(finishedWork) {
  switch (finishedWork.tag) {
    case 13:
    case 19:
      var retryCache = finishedWork.stateNode;
      null === retryCache && (retryCache = finishedWork.stateNode = new PossiblyWeakSet());
      return retryCache;
    case 22:
      return finishedWork = finishedWork.stateNode, retryCache = finishedWork._retryCache, null === retryCache && (retryCache = finishedWork._retryCache = new PossiblyWeakSet()), retryCache;
    default:
      throw Error(formatProdErrorMessage(435, finishedWork.tag));
  }
}
function attachSuspenseRetryListeners(finishedWork, wakeables) {
  var retryCache = getRetryCache(finishedWork);
  wakeables.forEach(function(wakeable) {
    var retry = resolveRetryWakeable.bind(null, finishedWork, wakeable);
    retryCache.has(wakeable) || (retryCache.add(wakeable), wakeable.then(retry, retry));
  });
}
function recursivelyTraverseMutationEffects(root$jscomp$0, parentFiber) {
  var deletions = parentFiber.deletions;
  if (null !== deletions)
    for (var i = 0; i < deletions.length; i++) {
      var childToDelete = deletions[i], root2 = root$jscomp$0, returnFiber = parentFiber, parent = returnFiber;
      a: for (; null !== parent; ) {
        switch (parent.tag) {
          case 27:
          case 5:
            hostParent = parent.stateNode;
            hostParentIsContainer = false;
            break a;
          case 3:
            hostParent = parent.stateNode.containerInfo;
            hostParentIsContainer = true;
            break a;
          case 4:
            hostParent = parent.stateNode.containerInfo;
            hostParentIsContainer = true;
            break a;
        }
        parent = parent.return;
      }
      if (null === hostParent) throw Error(formatProdErrorMessage(160));
      commitDeletionEffectsOnFiber(root2, returnFiber, childToDelete);
      hostParent = null;
      hostParentIsContainer = false;
      root2 = childToDelete.alternate;
      null !== root2 && (root2.return = null);
      childToDelete.return = null;
    }
  if (parentFiber.subtreeFlags & 13878)
    for (parentFiber = parentFiber.child; null !== parentFiber; )
      commitMutationEffectsOnFiber(parentFiber, root$jscomp$0), parentFiber = parentFiber.sibling;
}
var currentHoistableRoot = null;
function commitMutationEffectsOnFiber(finishedWork, root2) {
  var current = finishedWork.alternate, flags = finishedWork.flags;
  switch (finishedWork.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      recursivelyTraverseMutationEffects(root2, finishedWork);
      commitReconciliationEffects(finishedWork);
      flags & 4 && (commitHookEffectListUnmount(3, finishedWork, finishedWork.return), commitHookEffectListMount(3, finishedWork), commitHookEffectListUnmount(5, finishedWork, finishedWork.return));
      break;
    case 1:
      recursivelyTraverseMutationEffects(root2, finishedWork);
      commitReconciliationEffects(finishedWork);
      flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
      flags & 64 && offscreenSubtreeIsHidden && (finishedWork = finishedWork.updateQueue, null !== finishedWork && (flags = finishedWork.callbacks, null !== flags && (current = finishedWork.shared.hiddenCallbacks, finishedWork.shared.hiddenCallbacks = null === current ? flags : current.concat(flags))));
      break;
    case 26:
      var hoistableRoot = currentHoistableRoot;
      recursivelyTraverseMutationEffects(root2, finishedWork);
      commitReconciliationEffects(finishedWork);
      flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
      if (flags & 4) {
        var currentResource = null !== current ? current.memoizedState : null;
        flags = finishedWork.memoizedState;
        if (null === current)
          if (null === flags)
            if (null === finishedWork.stateNode) {
              a: {
                flags = finishedWork.type;
                current = finishedWork.memoizedProps;
                hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
                b: switch (flags) {
                  case "title":
                    currentResource = hoistableRoot.getElementsByTagName("title")[0];
                    if (!currentResource || currentResource[internalHoistableMarker] || currentResource[internalInstanceKey] || "http://www.w3.org/2000/svg" === currentResource.namespaceURI || currentResource.hasAttribute("itemprop"))
                      currentResource = hoistableRoot.createElement(flags), hoistableRoot.head.insertBefore(
                        currentResource,
                        hoistableRoot.querySelector("head > title")
                      );
                    setInitialProperties(currentResource, flags, current);
                    currentResource[internalInstanceKey] = finishedWork;
                    markNodeAsHoistable(currentResource);
                    flags = currentResource;
                    break a;
                  case "link":
                    var maybeNodes = getHydratableHoistableCache(
                      "link",
                      "href",
                      hoistableRoot
                    ).get(flags + (current.href || ""));
                    if (maybeNodes) {
                      for (var i = 0; i < maybeNodes.length; i++)
                        if (currentResource = maybeNodes[i], currentResource.getAttribute("href") === (null == current.href ? null : current.href) && currentResource.getAttribute("rel") === (null == current.rel ? null : current.rel) && currentResource.getAttribute("title") === (null == current.title ? null : current.title) && currentResource.getAttribute("crossorigin") === (null == current.crossOrigin ? null : current.crossOrigin)) {
                          maybeNodes.splice(i, 1);
                          break b;
                        }
                    }
                    currentResource = hoistableRoot.createElement(flags);
                    setInitialProperties(currentResource, flags, current);
                    hoistableRoot.head.appendChild(currentResource);
                    break;
                  case "meta":
                    if (maybeNodes = getHydratableHoistableCache(
                      "meta",
                      "content",
                      hoistableRoot
                    ).get(flags + (current.content || ""))) {
                      for (i = 0; i < maybeNodes.length; i++)
                        if (currentResource = maybeNodes[i], currentResource.getAttribute("content") === (null == current.content ? null : "" + current.content) && currentResource.getAttribute("name") === (null == current.name ? null : current.name) && currentResource.getAttribute("property") === (null == current.property ? null : current.property) && currentResource.getAttribute("http-equiv") === (null == current.httpEquiv ? null : current.httpEquiv) && currentResource.getAttribute("charset") === (null == current.charSet ? null : current.charSet)) {
                          maybeNodes.splice(i, 1);
                          break b;
                        }
                    }
                    currentResource = hoistableRoot.createElement(flags);
                    setInitialProperties(currentResource, flags, current);
                    hoistableRoot.head.appendChild(currentResource);
                    break;
                  default:
                    throw Error(formatProdErrorMessage(468, flags));
                }
                currentResource[internalInstanceKey] = finishedWork;
                markNodeAsHoistable(currentResource);
                flags = currentResource;
              }
              finishedWork.stateNode = flags;
            } else
              mountHoistable(
                hoistableRoot,
                finishedWork.type,
                finishedWork.stateNode
              );
          else
            finishedWork.stateNode = acquireResource(
              hoistableRoot,
              flags,
              finishedWork.memoizedProps
            );
        else
          currentResource !== flags ? (null === currentResource ? null !== current.stateNode && (current = current.stateNode, current.parentNode.removeChild(current)) : currentResource.count--, null === flags ? mountHoistable(
            hoistableRoot,
            finishedWork.type,
            finishedWork.stateNode
          ) : acquireResource(
            hoistableRoot,
            flags,
            finishedWork.memoizedProps
          )) : null === flags && null !== finishedWork.stateNode && commitHostUpdate(
            finishedWork,
            finishedWork.memoizedProps,
            current.memoizedProps
          );
      }
      break;
    case 27:
      if (flags & 4 && null === finishedWork.alternate) {
        hoistableRoot = finishedWork.stateNode;
        currentResource = finishedWork.memoizedProps;
        try {
          for (var node = hoistableRoot.firstChild; node; ) {
            var nextNode = node.nextSibling, nodeName = node.nodeName;
            node[internalHoistableMarker] || "HEAD" === nodeName || "BODY" === nodeName || "SCRIPT" === nodeName || "STYLE" === nodeName || "LINK" === nodeName && "stylesheet" === node.rel.toLowerCase() || hoistableRoot.removeChild(node);
            node = nextNode;
          }
          for (var type = finishedWork.type, attributes = hoistableRoot.attributes; attributes.length; )
            hoistableRoot.removeAttributeNode(attributes[0]);
          setInitialProperties(hoistableRoot, type, currentResource);
          hoistableRoot[internalInstanceKey] = finishedWork;
          hoistableRoot[internalPropsKey] = currentResource;
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
    case 5:
      recursivelyTraverseMutationEffects(root2, finishedWork);
      commitReconciliationEffects(finishedWork);
      flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
      if (finishedWork.flags & 32) {
        hoistableRoot = finishedWork.stateNode;
        try {
          setTextContent(hoistableRoot, "");
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
      flags & 4 && null != finishedWork.stateNode && (hoistableRoot = finishedWork.memoizedProps, commitHostUpdate(
        finishedWork,
        hoistableRoot,
        null !== current ? current.memoizedProps : hoistableRoot
      ));
      flags & 1024 && (needsFormReset = true);
      break;
    case 6:
      recursivelyTraverseMutationEffects(root2, finishedWork);
      commitReconciliationEffects(finishedWork);
      if (flags & 4) {
        if (null === finishedWork.stateNode)
          throw Error(formatProdErrorMessage(162));
        flags = finishedWork.memoizedProps;
        current = finishedWork.stateNode;
        try {
          current.nodeValue = flags;
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      }
      break;
    case 3:
      tagCaches = null;
      hoistableRoot = currentHoistableRoot;
      currentHoistableRoot = getHoistableRoot(root2.containerInfo);
      recursivelyTraverseMutationEffects(root2, finishedWork);
      currentHoistableRoot = hoistableRoot;
      commitReconciliationEffects(finishedWork);
      if (flags & 4 && null !== current && current.memoizedState.isDehydrated)
        try {
          retryIfBlockedOn(root2.containerInfo);
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      needsFormReset && (needsFormReset = false, recursivelyResetForms(finishedWork));
      break;
    case 4:
      flags = currentHoistableRoot;
      currentHoistableRoot = getHoistableRoot(
        finishedWork.stateNode.containerInfo
      );
      recursivelyTraverseMutationEffects(root2, finishedWork);
      commitReconciliationEffects(finishedWork);
      currentHoistableRoot = flags;
      break;
    case 12:
      recursivelyTraverseMutationEffects(root2, finishedWork);
      commitReconciliationEffects(finishedWork);
      break;
    case 13:
      recursivelyTraverseMutationEffects(root2, finishedWork);
      commitReconciliationEffects(finishedWork);
      finishedWork.child.flags & 8192 && null !== finishedWork.memoizedState !== (null !== current && null !== current.memoizedState) && (globalMostRecentFallbackTime = now());
      flags & 4 && (flags = finishedWork.updateQueue, null !== flags && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, flags)));
      break;
    case 22:
      flags & 512 && (offscreenSubtreeWasHidden || null === current || safelyDetachRef(current, current.return));
      node = null !== finishedWork.memoizedState;
      nextNode = null !== current && null !== current.memoizedState;
      nodeName = offscreenSubtreeIsHidden;
      type = offscreenSubtreeWasHidden;
      offscreenSubtreeIsHidden = nodeName || node;
      offscreenSubtreeWasHidden = type || nextNode;
      recursivelyTraverseMutationEffects(root2, finishedWork);
      offscreenSubtreeWasHidden = type;
      offscreenSubtreeIsHidden = nodeName;
      commitReconciliationEffects(finishedWork);
      root2 = finishedWork.stateNode;
      root2._current = finishedWork;
      root2._visibility &= -3;
      root2._visibility |= root2._pendingVisibility & 2;
      if (flags & 8192 && (root2._visibility = node ? root2._visibility & -2 : root2._visibility | 1, node && (root2 = offscreenSubtreeIsHidden || offscreenSubtreeWasHidden, null === current || nextNode || root2 || recursivelyTraverseDisappearLayoutEffects(finishedWork)), null === finishedWork.memoizedProps || "manual" !== finishedWork.memoizedProps.mode))
        a: for (current = null, root2 = finishedWork; ; ) {
          if (5 === root2.tag || 26 === root2.tag || 27 === root2.tag) {
            if (null === current) {
              nextNode = current = root2;
              try {
                if (hoistableRoot = nextNode.stateNode, node)
                  currentResource = hoistableRoot.style, "function" === typeof currentResource.setProperty ? currentResource.setProperty(
                    "display",
                    "none",
                    "important"
                  ) : currentResource.display = "none";
                else {
                  maybeNodes = nextNode.stateNode;
                  i = nextNode.memoizedProps.style;
                  var display = void 0 !== i && null !== i && i.hasOwnProperty("display") ? i.display : null;
                  maybeNodes.style.display = null == display || "boolean" === typeof display ? "" : ("" + display).trim();
                }
              } catch (error) {
                captureCommitPhaseError(nextNode, nextNode.return, error);
              }
            }
          } else if (6 === root2.tag) {
            if (null === current) {
              nextNode = root2;
              try {
                nextNode.stateNode.nodeValue = node ? "" : nextNode.memoizedProps;
              } catch (error) {
                captureCommitPhaseError(nextNode, nextNode.return, error);
              }
            }
          } else if ((22 !== root2.tag && 23 !== root2.tag || null === root2.memoizedState || root2 === finishedWork) && null !== root2.child) {
            root2.child.return = root2;
            root2 = root2.child;
            continue;
          }
          if (root2 === finishedWork) break a;
          for (; null === root2.sibling; ) {
            if (null === root2.return || root2.return === finishedWork) break a;
            current === root2 && (current = null);
            root2 = root2.return;
          }
          current === root2 && (current = null);
          root2.sibling.return = root2.return;
          root2 = root2.sibling;
        }
      flags & 4 && (flags = finishedWork.updateQueue, null !== flags && (current = flags.retryQueue, null !== current && (flags.retryQueue = null, attachSuspenseRetryListeners(finishedWork, current))));
      break;
    case 19:
      recursivelyTraverseMutationEffects(root2, finishedWork);
      commitReconciliationEffects(finishedWork);
      flags & 4 && (flags = finishedWork.updateQueue, null !== flags && (finishedWork.updateQueue = null, attachSuspenseRetryListeners(finishedWork, flags)));
      break;
    case 21:
      break;
    default:
      recursivelyTraverseMutationEffects(root2, finishedWork), commitReconciliationEffects(finishedWork);
  }
}
function commitReconciliationEffects(finishedWork) {
  var flags = finishedWork.flags;
  if (flags & 2) {
    try {
      if (27 !== finishedWork.tag) {
        a: {
          for (var parent = finishedWork.return; null !== parent; ) {
            if (isHostParent(parent)) {
              var JSCompiler_inline_result = parent;
              break a;
            }
            parent = parent.return;
          }
          throw Error(formatProdErrorMessage(160));
        }
        switch (JSCompiler_inline_result.tag) {
          case 27:
            var parent$jscomp$0 = JSCompiler_inline_result.stateNode, before = getHostSibling(finishedWork);
            insertOrAppendPlacementNode(finishedWork, before, parent$jscomp$0);
            break;
          case 5:
            var parent$113 = JSCompiler_inline_result.stateNode;
            JSCompiler_inline_result.flags & 32 && (setTextContent(parent$113, ""), JSCompiler_inline_result.flags &= -33);
            var before$114 = getHostSibling(finishedWork);
            insertOrAppendPlacementNode(finishedWork, before$114, parent$113);
            break;
          case 3:
          case 4:
            var parent$115 = JSCompiler_inline_result.stateNode.containerInfo, before$116 = getHostSibling(finishedWork);
            insertOrAppendPlacementNodeIntoContainer(
              finishedWork,
              before$116,
              parent$115
            );
            break;
          default:
            throw Error(formatProdErrorMessage(161));
        }
      }
    } catch (error) {
      captureCommitPhaseError(finishedWork, finishedWork.return, error);
    }
    finishedWork.flags &= -3;
  }
  flags & 4096 && (finishedWork.flags &= -4097);
}
function recursivelyResetForms(parentFiber) {
  if (parentFiber.subtreeFlags & 1024)
    for (parentFiber = parentFiber.child; null !== parentFiber; ) {
      var fiber = parentFiber;
      recursivelyResetForms(fiber);
      5 === fiber.tag && fiber.flags & 1024 && fiber.stateNode.reset();
      parentFiber = parentFiber.sibling;
    }
}
function recursivelyTraverseLayoutEffects(root2, parentFiber) {
  if (parentFiber.subtreeFlags & 8772)
    for (parentFiber = parentFiber.child; null !== parentFiber; )
      commitLayoutEffectOnFiber(root2, parentFiber.alternate, parentFiber), parentFiber = parentFiber.sibling;
}
function recursivelyTraverseDisappearLayoutEffects(parentFiber) {
  for (parentFiber = parentFiber.child; null !== parentFiber; ) {
    var finishedWork = parentFiber;
    switch (finishedWork.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        commitHookEffectListUnmount(4, finishedWork, finishedWork.return);
        recursivelyTraverseDisappearLayoutEffects(finishedWork);
        break;
      case 1:
        safelyDetachRef(finishedWork, finishedWork.return);
        var instance = finishedWork.stateNode;
        "function" === typeof instance.componentWillUnmount && safelyCallComponentWillUnmount(
          finishedWork,
          finishedWork.return,
          instance
        );
        recursivelyTraverseDisappearLayoutEffects(finishedWork);
        break;
      case 26:
      case 27:
      case 5:
        safelyDetachRef(finishedWork, finishedWork.return);
        recursivelyTraverseDisappearLayoutEffects(finishedWork);
        break;
      case 22:
        safelyDetachRef(finishedWork, finishedWork.return);
        null === finishedWork.memoizedState && recursivelyTraverseDisappearLayoutEffects(finishedWork);
        break;
      default:
        recursivelyTraverseDisappearLayoutEffects(finishedWork);
    }
    parentFiber = parentFiber.sibling;
  }
}
function recursivelyTraverseReappearLayoutEffects(finishedRoot$jscomp$0, parentFiber, includeWorkInProgressEffects) {
  includeWorkInProgressEffects = includeWorkInProgressEffects && 0 !== (parentFiber.subtreeFlags & 8772);
  for (parentFiber = parentFiber.child; null !== parentFiber; ) {
    var current = parentFiber.alternate, finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, flags = finishedWork.flags;
    switch (finishedWork.tag) {
      case 0:
      case 11:
      case 15:
        recursivelyTraverseReappearLayoutEffects(
          finishedRoot,
          finishedWork,
          includeWorkInProgressEffects
        );
        commitHookEffectListMount(4, finishedWork);
        break;
      case 1:
        recursivelyTraverseReappearLayoutEffects(
          finishedRoot,
          finishedWork,
          includeWorkInProgressEffects
        );
        current = finishedWork;
        finishedRoot = current.stateNode;
        if ("function" === typeof finishedRoot.componentDidMount)
          try {
            finishedRoot.componentDidMount();
          } catch (error) {
            captureCommitPhaseError(current, current.return, error);
          }
        current = finishedWork;
        finishedRoot = current.updateQueue;
        if (null !== finishedRoot) {
          var instance = current.stateNode;
          try {
            var hiddenCallbacks = finishedRoot.shared.hiddenCallbacks;
            if (null !== hiddenCallbacks)
              for (finishedRoot.shared.hiddenCallbacks = null, finishedRoot = 0; finishedRoot < hiddenCallbacks.length; finishedRoot++)
                callCallback(hiddenCallbacks[finishedRoot], instance);
          } catch (error) {
            captureCommitPhaseError(current, current.return, error);
          }
        }
        includeWorkInProgressEffects && flags & 64 && commitClassCallbacks(finishedWork);
        safelyAttachRef(finishedWork, finishedWork.return);
        break;
      case 26:
      case 27:
      case 5:
        recursivelyTraverseReappearLayoutEffects(
          finishedRoot,
          finishedWork,
          includeWorkInProgressEffects
        );
        includeWorkInProgressEffects && null === current && flags & 4 && commitHostMount(finishedWork);
        safelyAttachRef(finishedWork, finishedWork.return);
        break;
      case 12:
        recursivelyTraverseReappearLayoutEffects(
          finishedRoot,
          finishedWork,
          includeWorkInProgressEffects
        );
        break;
      case 13:
        recursivelyTraverseReappearLayoutEffects(
          finishedRoot,
          finishedWork,
          includeWorkInProgressEffects
        );
        includeWorkInProgressEffects && flags & 4 && commitSuspenseHydrationCallbacks(finishedRoot, finishedWork);
        break;
      case 22:
        null === finishedWork.memoizedState && recursivelyTraverseReappearLayoutEffects(
          finishedRoot,
          finishedWork,
          includeWorkInProgressEffects
        );
        safelyAttachRef(finishedWork, finishedWork.return);
        break;
      default:
        recursivelyTraverseReappearLayoutEffects(
          finishedRoot,
          finishedWork,
          includeWorkInProgressEffects
        );
    }
    parentFiber = parentFiber.sibling;
  }
}
function commitOffscreenPassiveMountEffects(current, finishedWork) {
  var previousCache = null;
  null !== current && null !== current.memoizedState && null !== current.memoizedState.cachePool && (previousCache = current.memoizedState.cachePool.pool);
  current = null;
  null !== finishedWork.memoizedState && null !== finishedWork.memoizedState.cachePool && (current = finishedWork.memoizedState.cachePool.pool);
  current !== previousCache && (null != current && current.refCount++, null != previousCache && releaseCache(previousCache));
}
function commitCachePassiveMountEffect(current, finishedWork) {
  current = null;
  null !== finishedWork.alternate && (current = finishedWork.alternate.memoizedState.cache);
  finishedWork = finishedWork.memoizedState.cache;
  finishedWork !== current && (finishedWork.refCount++, null != current && releaseCache(current));
}
function recursivelyTraversePassiveMountEffects(root2, parentFiber, committedLanes, committedTransitions) {
  if (parentFiber.subtreeFlags & 10256)
    for (parentFiber = parentFiber.child; null !== parentFiber; )
      commitPassiveMountOnFiber(
        root2,
        parentFiber,
        committedLanes,
        committedTransitions
      ), parentFiber = parentFiber.sibling;
}
function commitPassiveMountOnFiber(finishedRoot, finishedWork, committedLanes, committedTransitions) {
  var flags = finishedWork.flags;
  switch (finishedWork.tag) {
    case 0:
    case 11:
    case 15:
      recursivelyTraversePassiveMountEffects(
        finishedRoot,
        finishedWork,
        committedLanes,
        committedTransitions
      );
      flags & 2048 && commitHookEffectListMount(9, finishedWork);
      break;
    case 3:
      recursivelyTraversePassiveMountEffects(
        finishedRoot,
        finishedWork,
        committedLanes,
        committedTransitions
      );
      flags & 2048 && (finishedRoot = null, null !== finishedWork.alternate && (finishedRoot = finishedWork.alternate.memoizedState.cache), finishedWork = finishedWork.memoizedState.cache, finishedWork !== finishedRoot && (finishedWork.refCount++, null != finishedRoot && releaseCache(finishedRoot)));
      break;
    case 12:
      if (flags & 2048) {
        recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        );
        finishedRoot = finishedWork.stateNode;
        try {
          var _finishedWork$memoize2 = finishedWork.memoizedProps, id = _finishedWork$memoize2.id, onPostCommit = _finishedWork$memoize2.onPostCommit;
          "function" === typeof onPostCommit && onPostCommit(
            id,
            null === finishedWork.alternate ? "mount" : "update",
            finishedRoot.passiveEffectDuration,
            -0
          );
        } catch (error) {
          captureCommitPhaseError(finishedWork, finishedWork.return, error);
        }
      } else
        recursivelyTraversePassiveMountEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions
        );
      break;
    case 23:
      break;
    case 22:
      _finishedWork$memoize2 = finishedWork.stateNode;
      null !== finishedWork.memoizedState ? _finishedWork$memoize2._visibility & 4 ? recursivelyTraversePassiveMountEffects(
        finishedRoot,
        finishedWork,
        committedLanes,
        committedTransitions
      ) : recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork) : _finishedWork$memoize2._visibility & 4 ? recursivelyTraversePassiveMountEffects(
        finishedRoot,
        finishedWork,
        committedLanes,
        committedTransitions
      ) : (_finishedWork$memoize2._visibility |= 4, recursivelyTraverseReconnectPassiveEffects(
        finishedRoot,
        finishedWork,
        committedLanes,
        committedTransitions,
        0 !== (finishedWork.subtreeFlags & 10256)
      ));
      flags & 2048 && commitOffscreenPassiveMountEffects(
        finishedWork.alternate,
        finishedWork
      );
      break;
    case 24:
      recursivelyTraversePassiveMountEffects(
        finishedRoot,
        finishedWork,
        committedLanes,
        committedTransitions
      );
      flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
      break;
    default:
      recursivelyTraversePassiveMountEffects(
        finishedRoot,
        finishedWork,
        committedLanes,
        committedTransitions
      );
  }
}
function recursivelyTraverseReconnectPassiveEffects(finishedRoot$jscomp$0, parentFiber, committedLanes$jscomp$0, committedTransitions$jscomp$0, includeWorkInProgressEffects) {
  includeWorkInProgressEffects = includeWorkInProgressEffects && 0 !== (parentFiber.subtreeFlags & 10256);
  for (parentFiber = parentFiber.child; null !== parentFiber; ) {
    var finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, committedLanes = committedLanes$jscomp$0, committedTransitions = committedTransitions$jscomp$0, flags = finishedWork.flags;
    switch (finishedWork.tag) {
      case 0:
      case 11:
      case 15:
        recursivelyTraverseReconnectPassiveEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions,
          includeWorkInProgressEffects
        );
        commitHookEffectListMount(8, finishedWork);
        break;
      case 23:
        break;
      case 22:
        var instance = finishedWork.stateNode;
        null !== finishedWork.memoizedState ? instance._visibility & 4 ? recursivelyTraverseReconnectPassiveEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions,
          includeWorkInProgressEffects
        ) : recursivelyTraverseAtomicPassiveEffects(
          finishedRoot,
          finishedWork
        ) : (instance._visibility |= 4, recursivelyTraverseReconnectPassiveEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions,
          includeWorkInProgressEffects
        ));
        includeWorkInProgressEffects && flags & 2048 && commitOffscreenPassiveMountEffects(
          finishedWork.alternate,
          finishedWork
        );
        break;
      case 24:
        recursivelyTraverseReconnectPassiveEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions,
          includeWorkInProgressEffects
        );
        includeWorkInProgressEffects && flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
        break;
      default:
        recursivelyTraverseReconnectPassiveEffects(
          finishedRoot,
          finishedWork,
          committedLanes,
          committedTransitions,
          includeWorkInProgressEffects
        );
    }
    parentFiber = parentFiber.sibling;
  }
}
function recursivelyTraverseAtomicPassiveEffects(finishedRoot$jscomp$0, parentFiber) {
  if (parentFiber.subtreeFlags & 10256)
    for (parentFiber = parentFiber.child; null !== parentFiber; ) {
      var finishedRoot = finishedRoot$jscomp$0, finishedWork = parentFiber, flags = finishedWork.flags;
      switch (finishedWork.tag) {
        case 22:
          recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
          flags & 2048 && commitOffscreenPassiveMountEffects(
            finishedWork.alternate,
            finishedWork
          );
          break;
        case 24:
          recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
          flags & 2048 && commitCachePassiveMountEffect(finishedWork.alternate, finishedWork);
          break;
        default:
          recursivelyTraverseAtomicPassiveEffects(finishedRoot, finishedWork);
      }
      parentFiber = parentFiber.sibling;
    }
}
var suspenseyCommitFlag = 8192;
function recursivelyAccumulateSuspenseyCommit(parentFiber) {
  if (parentFiber.subtreeFlags & suspenseyCommitFlag)
    for (parentFiber = parentFiber.child; null !== parentFiber; )
      accumulateSuspenseyCommitOnFiber(parentFiber), parentFiber = parentFiber.sibling;
}
function accumulateSuspenseyCommitOnFiber(fiber) {
  switch (fiber.tag) {
    case 26:
      recursivelyAccumulateSuspenseyCommit(fiber);
      fiber.flags & suspenseyCommitFlag && null !== fiber.memoizedState && suspendResource(
        currentHoistableRoot,
        fiber.memoizedState,
        fiber.memoizedProps
      );
      break;
    case 5:
      recursivelyAccumulateSuspenseyCommit(fiber);
      break;
    case 3:
    case 4:
      var previousHoistableRoot = currentHoistableRoot;
      currentHoistableRoot = getHoistableRoot(fiber.stateNode.containerInfo);
      recursivelyAccumulateSuspenseyCommit(fiber);
      currentHoistableRoot = previousHoistableRoot;
      break;
    case 22:
      null === fiber.memoizedState && (previousHoistableRoot = fiber.alternate, null !== previousHoistableRoot && null !== previousHoistableRoot.memoizedState ? (previousHoistableRoot = suspenseyCommitFlag, suspenseyCommitFlag = 16777216, recursivelyAccumulateSuspenseyCommit(fiber), suspenseyCommitFlag = previousHoistableRoot) : recursivelyAccumulateSuspenseyCommit(fiber));
      break;
    default:
      recursivelyAccumulateSuspenseyCommit(fiber);
  }
}
function detachAlternateSiblings(parentFiber) {
  var previousFiber = parentFiber.alternate;
  if (null !== previousFiber && (parentFiber = previousFiber.child, null !== parentFiber)) {
    previousFiber.child = null;
    do
      previousFiber = parentFiber.sibling, parentFiber.sibling = null, parentFiber = previousFiber;
    while (null !== parentFiber);
  }
}
function recursivelyTraversePassiveUnmountEffects(parentFiber) {
  var deletions = parentFiber.deletions;
  if (0 !== (parentFiber.flags & 16)) {
    if (null !== deletions)
      for (var i = 0; i < deletions.length; i++) {
        var childToDelete = deletions[i];
        nextEffect = childToDelete;
        commitPassiveUnmountEffectsInsideOfDeletedTree_begin(
          childToDelete,
          parentFiber
        );
      }
    detachAlternateSiblings(parentFiber);
  }
  if (parentFiber.subtreeFlags & 10256)
    for (parentFiber = parentFiber.child; null !== parentFiber; )
      commitPassiveUnmountOnFiber(parentFiber), parentFiber = parentFiber.sibling;
}
function commitPassiveUnmountOnFiber(finishedWork) {
  switch (finishedWork.tag) {
    case 0:
    case 11:
    case 15:
      recursivelyTraversePassiveUnmountEffects(finishedWork);
      finishedWork.flags & 2048 && commitHookEffectListUnmount(9, finishedWork, finishedWork.return);
      break;
    case 3:
      recursivelyTraversePassiveUnmountEffects(finishedWork);
      break;
    case 12:
      recursivelyTraversePassiveUnmountEffects(finishedWork);
      break;
    case 22:
      var instance = finishedWork.stateNode;
      null !== finishedWork.memoizedState && instance._visibility & 4 && (null === finishedWork.return || 13 !== finishedWork.return.tag) ? (instance._visibility &= -5, recursivelyTraverseDisconnectPassiveEffects(finishedWork)) : recursivelyTraversePassiveUnmountEffects(finishedWork);
      break;
    default:
      recursivelyTraversePassiveUnmountEffects(finishedWork);
  }
}
function recursivelyTraverseDisconnectPassiveEffects(parentFiber) {
  var deletions = parentFiber.deletions;
  if (0 !== (parentFiber.flags & 16)) {
    if (null !== deletions)
      for (var i = 0; i < deletions.length; i++) {
        var childToDelete = deletions[i];
        nextEffect = childToDelete;
        commitPassiveUnmountEffectsInsideOfDeletedTree_begin(
          childToDelete,
          parentFiber
        );
      }
    detachAlternateSiblings(parentFiber);
  }
  for (parentFiber = parentFiber.child; null !== parentFiber; ) {
    deletions = parentFiber;
    switch (deletions.tag) {
      case 0:
      case 11:
      case 15:
        commitHookEffectListUnmount(8, deletions, deletions.return);
        recursivelyTraverseDisconnectPassiveEffects(deletions);
        break;
      case 22:
        i = deletions.stateNode;
        i._visibility & 4 && (i._visibility &= -5, recursivelyTraverseDisconnectPassiveEffects(deletions));
        break;
      default:
        recursivelyTraverseDisconnectPassiveEffects(deletions);
    }
    parentFiber = parentFiber.sibling;
  }
}
function commitPassiveUnmountEffectsInsideOfDeletedTree_begin(deletedSubtreeRoot, nearestMountedAncestor) {
  for (; null !== nextEffect; ) {
    var fiber = nextEffect;
    switch (fiber.tag) {
      case 0:
      case 11:
      case 15:
        commitHookEffectListUnmount(8, fiber, nearestMountedAncestor);
        break;
      case 23:
      case 22:
        if (null !== fiber.memoizedState && null !== fiber.memoizedState.cachePool) {
          var cache = fiber.memoizedState.cachePool.pool;
          null != cache && cache.refCount++;
        }
        break;
      case 24:
        releaseCache(fiber.memoizedState.cache);
    }
    cache = fiber.child;
    if (null !== cache) cache.return = fiber, nextEffect = cache;
    else
      a: for (fiber = deletedSubtreeRoot; null !== nextEffect; ) {
        cache = nextEffect;
        var sibling = cache.sibling, returnFiber = cache.return;
        detachFiberAfterEffects(cache);
        if (cache === fiber) {
          nextEffect = null;
          break a;
        }
        if (null !== sibling) {
          sibling.return = returnFiber;
          nextEffect = sibling;
          break a;
        }
        nextEffect = returnFiber;
      }
  }
}
function FiberNode(tag, pendingProps, key, mode) {
  this.tag = tag;
  this.key = key;
  this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null;
  this.index = 0;
  this.refCleanup = this.ref = null;
  this.pendingProps = pendingProps;
  this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null;
  this.mode = mode;
  this.subtreeFlags = this.flags = 0;
  this.deletions = null;
  this.childLanes = this.lanes = 0;
  this.alternate = null;
}
function createFiberImplClass(tag, pendingProps, key, mode) {
  return new FiberNode(tag, pendingProps, key, mode);
}
function shouldConstruct(Component) {
  Component = Component.prototype;
  return !(!Component || !Component.isReactComponent);
}
function createWorkInProgress(current, pendingProps) {
  var workInProgress2 = current.alternate;
  null === workInProgress2 ? (workInProgress2 = createFiberImplClass(
    current.tag,
    pendingProps,
    current.key,
    current.mode
  ), workInProgress2.elementType = current.elementType, workInProgress2.type = current.type, workInProgress2.stateNode = current.stateNode, workInProgress2.alternate = current, current.alternate = workInProgress2) : (workInProgress2.pendingProps = pendingProps, workInProgress2.type = current.type, workInProgress2.flags = 0, workInProgress2.subtreeFlags = 0, workInProgress2.deletions = null);
  workInProgress2.flags = current.flags & 31457280;
  workInProgress2.childLanes = current.childLanes;
  workInProgress2.lanes = current.lanes;
  workInProgress2.child = current.child;
  workInProgress2.memoizedProps = current.memoizedProps;
  workInProgress2.memoizedState = current.memoizedState;
  workInProgress2.updateQueue = current.updateQueue;
  pendingProps = current.dependencies;
  workInProgress2.dependencies = null === pendingProps ? null : { lanes: pendingProps.lanes, firstContext: pendingProps.firstContext };
  workInProgress2.sibling = current.sibling;
  workInProgress2.index = current.index;
  workInProgress2.ref = current.ref;
  workInProgress2.refCleanup = current.refCleanup;
  return workInProgress2;
}
function resetWorkInProgress(workInProgress2, renderLanes2) {
  workInProgress2.flags &= 31457282;
  var current = workInProgress2.alternate;
  null === current ? (workInProgress2.childLanes = 0, workInProgress2.lanes = renderLanes2, workInProgress2.child = null, workInProgress2.subtreeFlags = 0, workInProgress2.memoizedProps = null, workInProgress2.memoizedState = null, workInProgress2.updateQueue = null, workInProgress2.dependencies = null, workInProgress2.stateNode = null) : (workInProgress2.childLanes = current.childLanes, workInProgress2.lanes = current.lanes, workInProgress2.child = current.child, workInProgress2.subtreeFlags = 0, workInProgress2.deletions = null, workInProgress2.memoizedProps = current.memoizedProps, workInProgress2.memoizedState = current.memoizedState, workInProgress2.updateQueue = current.updateQueue, workInProgress2.type = current.type, renderLanes2 = current.dependencies, workInProgress2.dependencies = null === renderLanes2 ? null : {
    lanes: renderLanes2.lanes,
    firstContext: renderLanes2.firstContext
  });
  return workInProgress2;
}
function createFiberFromTypeAndProps(type, key, pendingProps, owner, mode, lanes) {
  var fiberTag = 0;
  owner = type;
  if ("function" === typeof type) shouldConstruct(type) && (fiberTag = 1);
  else if ("string" === typeof type)
    fiberTag = isHostHoistableType(
      type,
      pendingProps,
      contextStackCursor.current
    ) ? 26 : "html" === type || "head" === type || "body" === type ? 27 : 5;
  else
    a: switch (type) {
      case REACT_FRAGMENT_TYPE:
        return createFiberFromFragment(pendingProps.children, mode, lanes, key);
      case REACT_STRICT_MODE_TYPE:
        fiberTag = 8;
        mode |= 24;
        break;
      case REACT_PROFILER_TYPE:
        return type = createFiberImplClass(12, pendingProps, key, mode | 2), type.elementType = REACT_PROFILER_TYPE, type.lanes = lanes, type;
      case REACT_SUSPENSE_TYPE:
        return type = createFiberImplClass(13, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_TYPE, type.lanes = lanes, type;
      case REACT_SUSPENSE_LIST_TYPE:
        return type = createFiberImplClass(19, pendingProps, key, mode), type.elementType = REACT_SUSPENSE_LIST_TYPE, type.lanes = lanes, type;
      case REACT_OFFSCREEN_TYPE:
        return createFiberFromOffscreen(pendingProps, mode, lanes, key);
      default:
        if ("object" === typeof type && null !== type)
          switch (type.$$typeof) {
            case REACT_PROVIDER_TYPE:
            case REACT_CONTEXT_TYPE:
              fiberTag = 10;
              break a;
            case REACT_CONSUMER_TYPE:
              fiberTag = 9;
              break a;
            case REACT_FORWARD_REF_TYPE:
              fiberTag = 11;
              break a;
            case REACT_MEMO_TYPE:
              fiberTag = 14;
              break a;
            case REACT_LAZY_TYPE:
              fiberTag = 16;
              owner = null;
              break a;
          }
        fiberTag = 29;
        pendingProps = Error(
          formatProdErrorMessage(130, null === type ? "null" : typeof type, "")
        );
        owner = null;
    }
  key = createFiberImplClass(fiberTag, pendingProps, key, mode);
  key.elementType = type;
  key.type = owner;
  key.lanes = lanes;
  return key;
}
function createFiberFromFragment(elements, mode, lanes, key) {
  elements = createFiberImplClass(7, elements, key, mode);
  elements.lanes = lanes;
  return elements;
}
function createFiberFromOffscreen(pendingProps, mode, lanes, key) {
  pendingProps = createFiberImplClass(22, pendingProps, key, mode);
  pendingProps.elementType = REACT_OFFSCREEN_TYPE;
  pendingProps.lanes = lanes;
  var primaryChildInstance = {
    _visibility: 1,
    _pendingVisibility: 1,
    _pendingMarkers: null,
    _retryCache: null,
    _transitions: null,
    _current: null,
    detach: function() {
      var fiber = primaryChildInstance._current;
      if (null === fiber) throw Error(formatProdErrorMessage(456));
      if (0 === (primaryChildInstance._pendingVisibility & 2)) {
        var root2 = enqueueConcurrentRenderForLane(fiber, 2);
        null !== root2 && (primaryChildInstance._pendingVisibility |= 2, scheduleUpdateOnFiber(root2, fiber, 2));
      }
    },
    attach: function() {
      var fiber = primaryChildInstance._current;
      if (null === fiber) throw Error(formatProdErrorMessage(456));
      if (0 !== (primaryChildInstance._pendingVisibility & 2)) {
        var root2 = enqueueConcurrentRenderForLane(fiber, 2);
        null !== root2 && (primaryChildInstance._pendingVisibility &= -3, scheduleUpdateOnFiber(root2, fiber, 2));
      }
    }
  };
  pendingProps.stateNode = primaryChildInstance;
  return pendingProps;
}
function createFiberFromText(content, mode, lanes) {
  content = createFiberImplClass(6, content, null, mode);
  content.lanes = lanes;
  return content;
}
function createFiberFromPortal(portal, mode, lanes) {
  mode = createFiberImplClass(
    4,
    null !== portal.children ? portal.children : [],
    portal.key,
    mode
  );
  mode.lanes = lanes;
  mode.stateNode = {
    containerInfo: portal.containerInfo,
    pendingChildren: null,
    implementation: portal.implementation
  };
  return mode;
}
function markUpdate(workInProgress2) {
  workInProgress2.flags |= 4;
}
function preloadResourceAndSuspendIfNeeded(workInProgress2, resource) {
  if ("stylesheet" !== resource.type || 0 !== (resource.state.loading & 4))
    workInProgress2.flags &= -16777217;
  else if (workInProgress2.flags |= 16777216, !preloadResource(resource)) {
    resource = suspenseHandlerStackCursor.current;
    if (null !== resource && ((workInProgressRootRenderLanes & 4194176) === workInProgressRootRenderLanes ? null !== shellBoundary : (workInProgressRootRenderLanes & 62914560) !== workInProgressRootRenderLanes && 0 === (workInProgressRootRenderLanes & 536870912) || resource !== shellBoundary))
      throw suspendedThenable = noopSuspenseyCommitThenable, SuspenseyCommitException;
    workInProgress2.flags |= 8192;
  }
}
function scheduleRetryEffect(workInProgress2, retryQueue) {
  null !== retryQueue && (workInProgress2.flags |= 4);
  workInProgress2.flags & 16384 && (retryQueue = 22 !== workInProgress2.tag ? claimNextRetryLane() : 536870912, workInProgress2.lanes |= retryQueue, workInProgressSuspendedRetryLanes |= retryQueue);
}
function cutOffTailIfNeeded(renderState, hasRenderedATailFallback) {
  if (!isHydrating)
    switch (renderState.tailMode) {
      case "hidden":
        hasRenderedATailFallback = renderState.tail;
        for (var lastTailNode = null; null !== hasRenderedATailFallback; )
          null !== hasRenderedATailFallback.alternate && (lastTailNode = hasRenderedATailFallback), hasRenderedATailFallback = hasRenderedATailFallback.sibling;
        null === lastTailNode ? renderState.tail = null : lastTailNode.sibling = null;
        break;
      case "collapsed":
        lastTailNode = renderState.tail;
        for (var lastTailNode$131 = null; null !== lastTailNode; )
          null !== lastTailNode.alternate && (lastTailNode$131 = lastTailNode), lastTailNode = lastTailNode.sibling;
        null === lastTailNode$131 ? hasRenderedATailFallback || null === renderState.tail ? renderState.tail = null : renderState.tail.sibling = null : lastTailNode$131.sibling = null;
    }
}
function bubbleProperties(completedWork) {
  var didBailout = null !== completedWork.alternate && completedWork.alternate.child === completedWork.child, newChildLanes = 0, subtreeFlags = 0;
  if (didBailout)
    for (var child$132 = completedWork.child; null !== child$132; )
      newChildLanes |= child$132.lanes | child$132.childLanes, subtreeFlags |= child$132.subtreeFlags & 31457280, subtreeFlags |= child$132.flags & 31457280, child$132.return = completedWork, child$132 = child$132.sibling;
  else
    for (child$132 = completedWork.child; null !== child$132; )
      newChildLanes |= child$132.lanes | child$132.childLanes, subtreeFlags |= child$132.subtreeFlags, subtreeFlags |= child$132.flags, child$132.return = completedWork, child$132 = child$132.sibling;
  completedWork.subtreeFlags |= subtreeFlags;
  completedWork.childLanes = newChildLanes;
  return didBailout;
}
function completeWork(current, workInProgress2, renderLanes2) {
  var newProps = workInProgress2.pendingProps;
  popTreeContext(workInProgress2);
  switch (workInProgress2.tag) {
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return bubbleProperties(workInProgress2), null;
    case 1:
      return bubbleProperties(workInProgress2), null;
    case 3:
      renderLanes2 = workInProgress2.stateNode;
      newProps = null;
      null !== current && (newProps = current.memoizedState.cache);
      workInProgress2.memoizedState.cache !== newProps && (workInProgress2.flags |= 2048);
      popProvider(CacheContext);
      popHostContainer();
      renderLanes2.pendingContext && (renderLanes2.context = renderLanes2.pendingContext, renderLanes2.pendingContext = null);
      if (null === current || null === current.child)
        popHydrationState(workInProgress2) ? markUpdate(workInProgress2) : null === current || current.memoizedState.isDehydrated && 0 === (workInProgress2.flags & 256) || (workInProgress2.flags |= 1024, null !== hydrationErrors && (queueRecoverableErrors(hydrationErrors), hydrationErrors = null));
      bubbleProperties(workInProgress2);
      return null;
    case 26:
      return renderLanes2 = workInProgress2.memoizedState, null === current ? (markUpdate(workInProgress2), null !== renderLanes2 ? (bubbleProperties(workInProgress2), preloadResourceAndSuspendIfNeeded(workInProgress2, renderLanes2)) : (bubbleProperties(workInProgress2), workInProgress2.flags &= -16777217)) : renderLanes2 ? renderLanes2 !== current.memoizedState ? (markUpdate(workInProgress2), bubbleProperties(workInProgress2), preloadResourceAndSuspendIfNeeded(workInProgress2, renderLanes2)) : (bubbleProperties(workInProgress2), workInProgress2.flags &= -16777217) : (current.memoizedProps !== newProps && markUpdate(workInProgress2), bubbleProperties(workInProgress2), workInProgress2.flags &= -16777217), null;
    case 27:
      popHostContext(workInProgress2);
      renderLanes2 = rootInstanceStackCursor.current;
      var type = workInProgress2.type;
      if (null !== current && null != workInProgress2.stateNode)
        current.memoizedProps !== newProps && markUpdate(workInProgress2);
      else {
        if (!newProps) {
          if (null === workInProgress2.stateNode)
            throw Error(formatProdErrorMessage(166));
          bubbleProperties(workInProgress2);
          return null;
        }
        current = contextStackCursor.current;
        popHydrationState(workInProgress2) ? prepareToHydrateHostInstance(workInProgress2) : (current = resolveSingletonInstance(type, newProps, renderLanes2), workInProgress2.stateNode = current, markUpdate(workInProgress2));
      }
      bubbleProperties(workInProgress2);
      return null;
    case 5:
      popHostContext(workInProgress2);
      renderLanes2 = workInProgress2.type;
      if (null !== current && null != workInProgress2.stateNode)
        current.memoizedProps !== newProps && markUpdate(workInProgress2);
      else {
        if (!newProps) {
          if (null === workInProgress2.stateNode)
            throw Error(formatProdErrorMessage(166));
          bubbleProperties(workInProgress2);
          return null;
        }
        current = contextStackCursor.current;
        if (popHydrationState(workInProgress2))
          prepareToHydrateHostInstance(workInProgress2);
        else {
          type = getOwnerDocumentFromRootContainer(
            rootInstanceStackCursor.current
          );
          switch (current) {
            case 1:
              current = type.createElementNS(
                "http://www.w3.org/2000/svg",
                renderLanes2
              );
              break;
            case 2:
              current = type.createElementNS(
                "http://www.w3.org/1998/Math/MathML",
                renderLanes2
              );
              break;
            default:
              switch (renderLanes2) {
                case "svg":
                  current = type.createElementNS(
                    "http://www.w3.org/2000/svg",
                    renderLanes2
                  );
                  break;
                case "math":
                  current = type.createElementNS(
                    "http://www.w3.org/1998/Math/MathML",
                    renderLanes2
                  );
                  break;
                case "script":
                  current = type.createElement("div");
                  current.innerHTML = "<script><\/script>";
                  current = current.removeChild(current.firstChild);
                  break;
                case "select":
                  current = "string" === typeof newProps.is ? type.createElement("select", { is: newProps.is }) : type.createElement("select");
                  newProps.multiple ? current.multiple = true : newProps.size && (current.size = newProps.size);
                  break;
                default:
                  current = "string" === typeof newProps.is ? type.createElement(renderLanes2, { is: newProps.is }) : type.createElement(renderLanes2);
              }
          }
          current[internalInstanceKey] = workInProgress2;
          current[internalPropsKey] = newProps;
          a: for (type = workInProgress2.child; null !== type; ) {
            if (5 === type.tag || 6 === type.tag)
              current.appendChild(type.stateNode);
            else if (4 !== type.tag && 27 !== type.tag && null !== type.child) {
              type.child.return = type;
              type = type.child;
              continue;
            }
            if (type === workInProgress2) break a;
            for (; null === type.sibling; ) {
              if (null === type.return || type.return === workInProgress2)
                break a;
              type = type.return;
            }
            type.sibling.return = type.return;
            type = type.sibling;
          }
          workInProgress2.stateNode = current;
          a: switch (setInitialProperties(current, renderLanes2, newProps), renderLanes2) {
            case "button":
            case "input":
            case "select":
            case "textarea":
              current = !!newProps.autoFocus;
              break a;
            case "img":
              current = true;
              break a;
            default:
              current = false;
          }
          current && markUpdate(workInProgress2);
        }
      }
      bubbleProperties(workInProgress2);
      workInProgress2.flags &= -16777217;
      return null;
    case 6:
      if (current && null != workInProgress2.stateNode)
        current.memoizedProps !== newProps && markUpdate(workInProgress2);
      else {
        if ("string" !== typeof newProps && null === workInProgress2.stateNode)
          throw Error(formatProdErrorMessage(166));
        current = rootInstanceStackCursor.current;
        if (popHydrationState(workInProgress2)) {
          current = workInProgress2.stateNode;
          renderLanes2 = workInProgress2.memoizedProps;
          newProps = null;
          type = hydrationParentFiber;
          if (null !== type)
            switch (type.tag) {
              case 27:
              case 5:
                newProps = type.memoizedProps;
            }
          current[internalInstanceKey] = workInProgress2;
          current = current.nodeValue === renderLanes2 || null !== newProps && true === newProps.suppressHydrationWarning || checkForUnmatchedText(current.nodeValue, renderLanes2) ? true : false;
          current || throwOnHydrationMismatch(workInProgress2);
        } else
          current = getOwnerDocumentFromRootContainer(current).createTextNode(
            newProps
          ), current[internalInstanceKey] = workInProgress2, workInProgress2.stateNode = current;
      }
      bubbleProperties(workInProgress2);
      return null;
    case 13:
      newProps = workInProgress2.memoizedState;
      if (null === current || null !== current.memoizedState && null !== current.memoizedState.dehydrated) {
        type = popHydrationState(workInProgress2);
        if (null !== newProps && null !== newProps.dehydrated) {
          if (null === current) {
            if (!type) throw Error(formatProdErrorMessage(318));
            type = workInProgress2.memoizedState;
            type = null !== type ? type.dehydrated : null;
            if (!type) throw Error(formatProdErrorMessage(317));
            type[internalInstanceKey] = workInProgress2;
          } else
            resetHydrationState(), 0 === (workInProgress2.flags & 128) && (workInProgress2.memoizedState = null), workInProgress2.flags |= 4;
          bubbleProperties(workInProgress2);
          type = false;
        } else
          null !== hydrationErrors && (queueRecoverableErrors(hydrationErrors), hydrationErrors = null), type = true;
        if (!type) {
          if (workInProgress2.flags & 256)
            return popSuspenseHandler(workInProgress2), workInProgress2;
          popSuspenseHandler(workInProgress2);
          return null;
        }
      }
      popSuspenseHandler(workInProgress2);
      if (0 !== (workInProgress2.flags & 128))
        return workInProgress2.lanes = renderLanes2, workInProgress2;
      renderLanes2 = null !== newProps;
      current = null !== current && null !== current.memoizedState;
      if (renderLanes2) {
        newProps = workInProgress2.child;
        type = null;
        null !== newProps.alternate && null !== newProps.alternate.memoizedState && null !== newProps.alternate.memoizedState.cachePool && (type = newProps.alternate.memoizedState.cachePool.pool);
        var cache$144 = null;
        null !== newProps.memoizedState && null !== newProps.memoizedState.cachePool && (cache$144 = newProps.memoizedState.cachePool.pool);
        cache$144 !== type && (newProps.flags |= 2048);
      }
      renderLanes2 !== current && renderLanes2 && (workInProgress2.child.flags |= 8192);
      scheduleRetryEffect(workInProgress2, workInProgress2.updateQueue);
      bubbleProperties(workInProgress2);
      return null;
    case 4:
      return popHostContainer(), null === current && listenToAllSupportedEvents(workInProgress2.stateNode.containerInfo), bubbleProperties(workInProgress2), null;
    case 10:
      return popProvider(workInProgress2.type), bubbleProperties(workInProgress2), null;
    case 19:
      pop(suspenseStackCursor);
      type = workInProgress2.memoizedState;
      if (null === type) return bubbleProperties(workInProgress2), null;
      newProps = 0 !== (workInProgress2.flags & 128);
      cache$144 = type.rendering;
      if (null === cache$144)
        if (newProps) cutOffTailIfNeeded(type, false);
        else {
          if (0 !== workInProgressRootExitStatus || null !== current && 0 !== (current.flags & 128))
            for (current = workInProgress2.child; null !== current; ) {
              cache$144 = findFirstSuspended(current);
              if (null !== cache$144) {
                workInProgress2.flags |= 128;
                cutOffTailIfNeeded(type, false);
                current = cache$144.updateQueue;
                workInProgress2.updateQueue = current;
                scheduleRetryEffect(workInProgress2, current);
                workInProgress2.subtreeFlags = 0;
                current = renderLanes2;
                for (renderLanes2 = workInProgress2.child; null !== renderLanes2; )
                  resetWorkInProgress(renderLanes2, current), renderLanes2 = renderLanes2.sibling;
                push(
                  suspenseStackCursor,
                  suspenseStackCursor.current & 1 | 2
                );
                return workInProgress2.child;
              }
              current = current.sibling;
            }
          null !== type.tail && now() > workInProgressRootRenderTargetTime && (workInProgress2.flags |= 128, newProps = true, cutOffTailIfNeeded(type, false), workInProgress2.lanes = 4194304);
        }
      else {
        if (!newProps)
          if (current = findFirstSuspended(cache$144), null !== current) {
            if (workInProgress2.flags |= 128, newProps = true, current = current.updateQueue, workInProgress2.updateQueue = current, scheduleRetryEffect(workInProgress2, current), cutOffTailIfNeeded(type, true), null === type.tail && "hidden" === type.tailMode && !cache$144.alternate && !isHydrating)
              return bubbleProperties(workInProgress2), null;
          } else
            2 * now() - type.renderingStartTime > workInProgressRootRenderTargetTime && 536870912 !== renderLanes2 && (workInProgress2.flags |= 128, newProps = true, cutOffTailIfNeeded(type, false), workInProgress2.lanes = 4194304);
        type.isBackwards ? (cache$144.sibling = workInProgress2.child, workInProgress2.child = cache$144) : (current = type.last, null !== current ? current.sibling = cache$144 : workInProgress2.child = cache$144, type.last = cache$144);
      }
      if (null !== type.tail)
        return workInProgress2 = type.tail, type.rendering = workInProgress2, type.tail = workInProgress2.sibling, type.renderingStartTime = now(), workInProgress2.sibling = null, current = suspenseStackCursor.current, push(suspenseStackCursor, newProps ? current & 1 | 2 : current & 1), workInProgress2;
      bubbleProperties(workInProgress2);
      return null;
    case 22:
    case 23:
      return popSuspenseHandler(workInProgress2), popHiddenContext(), newProps = null !== workInProgress2.memoizedState, null !== current ? null !== current.memoizedState !== newProps && (workInProgress2.flags |= 8192) : newProps && (workInProgress2.flags |= 8192), newProps ? 0 !== (renderLanes2 & 536870912) && 0 === (workInProgress2.flags & 128) && (bubbleProperties(workInProgress2), workInProgress2.subtreeFlags & 6 && (workInProgress2.flags |= 8192)) : bubbleProperties(workInProgress2), renderLanes2 = workInProgress2.updateQueue, null !== renderLanes2 && scheduleRetryEffect(workInProgress2, renderLanes2.retryQueue), renderLanes2 = null, null !== current && null !== current.memoizedState && null !== current.memoizedState.cachePool && (renderLanes2 = current.memoizedState.cachePool.pool), newProps = null, null !== workInProgress2.memoizedState && null !== workInProgress2.memoizedState.cachePool && (newProps = workInProgress2.memoizedState.cachePool.pool), newProps !== renderLanes2 && (workInProgress2.flags |= 2048), null !== current && pop(resumedCache), null;
    case 24:
      return renderLanes2 = null, null !== current && (renderLanes2 = current.memoizedState.cache), workInProgress2.memoizedState.cache !== renderLanes2 && (workInProgress2.flags |= 2048), popProvider(CacheContext), bubbleProperties(workInProgress2), null;
    case 25:
      return null;
  }
  throw Error(formatProdErrorMessage(156, workInProgress2.tag));
}
function unwindWork(current, workInProgress2) {
  popTreeContext(workInProgress2);
  switch (workInProgress2.tag) {
    case 1:
      return current = workInProgress2.flags, current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
    case 3:
      return popProvider(CacheContext), popHostContainer(), current = workInProgress2.flags, 0 !== (current & 65536) && 0 === (current & 128) ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
    case 26:
    case 27:
    case 5:
      return popHostContext(workInProgress2), null;
    case 13:
      popSuspenseHandler(workInProgress2);
      current = workInProgress2.memoizedState;
      if (null !== current && null !== current.dehydrated) {
        if (null === workInProgress2.alternate)
          throw Error(formatProdErrorMessage(340));
        resetHydrationState();
      }
      current = workInProgress2.flags;
      return current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
    case 19:
      return pop(suspenseStackCursor), null;
    case 4:
      return popHostContainer(), null;
    case 10:
      return popProvider(workInProgress2.type), null;
    case 22:
    case 23:
      return popSuspenseHandler(workInProgress2), popHiddenContext(), null !== current && pop(resumedCache), current = workInProgress2.flags, current & 65536 ? (workInProgress2.flags = current & -65537 | 128, workInProgress2) : null;
    case 24:
      return popProvider(CacheContext), null;
    case 25:
      return null;
    default:
      return null;
  }
}
function unwindInterruptedWork(current, interruptedWork) {
  popTreeContext(interruptedWork);
  switch (interruptedWork.tag) {
    case 3:
      popProvider(CacheContext);
      popHostContainer();
      break;
    case 26:
    case 27:
    case 5:
      popHostContext(interruptedWork);
      break;
    case 4:
      popHostContainer();
      break;
    case 13:
      popSuspenseHandler(interruptedWork);
      break;
    case 19:
      pop(suspenseStackCursor);
      break;
    case 10:
      popProvider(interruptedWork.type);
      break;
    case 22:
    case 23:
      popSuspenseHandler(interruptedWork);
      popHiddenContext();
      null !== current && pop(resumedCache);
      break;
    case 24:
      popProvider(CacheContext);
  }
}
var DefaultAsyncDispatcher = {
  getCacheForType: function(resourceType) {
    var cache = readContext(CacheContext), cacheForType = cache.data.get(resourceType);
    void 0 === cacheForType && (cacheForType = resourceType(), cache.data.set(resourceType, cacheForType));
    return cacheForType;
  }
}, PossiblyWeakMap = "function" === typeof WeakMap ? WeakMap : Map, executionContext = 0, workInProgressRoot = null, workInProgress = null, workInProgressRootRenderLanes = 0, workInProgressSuspendedReason = 0, workInProgressThrownValue = null, workInProgressRootDidSkipSuspendedSiblings = false, workInProgressRootIsPrerendering = false, workInProgressRootDidAttachPingListener = false, entangledRenderLanes = 0, workInProgressRootExitStatus = 0, workInProgressRootSkippedLanes = 0, workInProgressRootInterleavedUpdatedLanes = 0, workInProgressRootPingedLanes = 0, workInProgressDeferredLane = 0, workInProgressSuspendedRetryLanes = 0, workInProgressRootConcurrentErrors = null, workInProgressRootRecoverableErrors = null, workInProgressRootDidIncludeRecursiveRenderUpdate = false, globalMostRecentFallbackTime = 0, workInProgressRootRenderTargetTime = Infinity, workInProgressTransitions = null, legacyErrorBoundariesThatAlreadyFailed = null, rootDoesHavePassiveEffects = false, rootWithPendingPassiveEffects = null, pendingPassiveEffectsLanes = 0, pendingPassiveEffectsRemainingLanes = 0, pendingPassiveTransitions = null, nestedUpdateCount = 0, rootWithNestedUpdates = null;
function requestUpdateLane() {
  if (0 !== (executionContext & 2) && 0 !== workInProgressRootRenderLanes)
    return workInProgressRootRenderLanes & -workInProgressRootRenderLanes;
  if (null !== ReactSharedInternals.T) {
    var actionScopeLane = currentEntangledLane;
    return 0 !== actionScopeLane ? actionScopeLane : requestTransitionLane();
  }
  return resolveUpdatePriority();
}
function requestDeferredLane() {
  0 === workInProgressDeferredLane && (workInProgressDeferredLane = 0 === (workInProgressRootRenderLanes & 536870912) || isHydrating ? claimNextTransitionLane() : 536870912);
  var suspenseHandler = suspenseHandlerStackCursor.current;
  null !== suspenseHandler && (suspenseHandler.flags |= 32);
  return workInProgressDeferredLane;
}
function scheduleUpdateOnFiber(root2, fiber, lane) {
  if (root2 === workInProgressRoot && 2 === workInProgressSuspendedReason || null !== root2.cancelPendingCommit)
    prepareFreshStack(root2, 0), markRootSuspended(
      root2,
      workInProgressRootRenderLanes,
      workInProgressDeferredLane,
      false
    );
  markRootUpdated$1(root2, lane);
  if (0 === (executionContext & 2) || root2 !== workInProgressRoot)
    root2 === workInProgressRoot && (0 === (executionContext & 2) && (workInProgressRootInterleavedUpdatedLanes |= lane), 4 === workInProgressRootExitStatus && markRootSuspended(
      root2,
      workInProgressRootRenderLanes,
      workInProgressDeferredLane,
      false
    )), ensureRootIsScheduled(root2);
}
function performWorkOnRoot(root$jscomp$0, lanes, forceSync) {
  if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(327));
  var shouldTimeSlice = !forceSync && 0 === (lanes & 60) && 0 === (lanes & root$jscomp$0.expiredLanes) || checkIfRootIsPrerendering(root$jscomp$0, lanes), exitStatus = shouldTimeSlice ? renderRootConcurrent(root$jscomp$0, lanes) : renderRootSync(root$jscomp$0, lanes, true), renderWasConcurrent = shouldTimeSlice;
  do {
    if (0 === exitStatus) {
      workInProgressRootIsPrerendering && !shouldTimeSlice && markRootSuspended(root$jscomp$0, lanes, 0, false);
      break;
    } else if (6 === exitStatus)
      markRootSuspended(
        root$jscomp$0,
        lanes,
        0,
        !workInProgressRootDidSkipSuspendedSiblings
      );
    else {
      forceSync = root$jscomp$0.current.alternate;
      if (renderWasConcurrent && !isRenderConsistentWithExternalStores(forceSync)) {
        exitStatus = renderRootSync(root$jscomp$0, lanes, false);
        renderWasConcurrent = false;
        continue;
      }
      if (2 === exitStatus) {
        renderWasConcurrent = lanes;
        if (root$jscomp$0.errorRecoveryDisabledLanes & renderWasConcurrent)
          var JSCompiler_inline_result = 0;
        else
          JSCompiler_inline_result = root$jscomp$0.pendingLanes & -536870913, JSCompiler_inline_result = 0 !== JSCompiler_inline_result ? JSCompiler_inline_result : JSCompiler_inline_result & 536870912 ? 536870912 : 0;
        if (0 !== JSCompiler_inline_result) {
          lanes = JSCompiler_inline_result;
          a: {
            var root2 = root$jscomp$0;
            exitStatus = workInProgressRootConcurrentErrors;
            var wasRootDehydrated = root2.current.memoizedState.isDehydrated;
            wasRootDehydrated && (prepareFreshStack(root2, JSCompiler_inline_result).flags |= 256);
            JSCompiler_inline_result = renderRootSync(
              root2,
              JSCompiler_inline_result,
              false
            );
            if (2 !== JSCompiler_inline_result) {
              if (workInProgressRootDidAttachPingListener && !wasRootDehydrated) {
                root2.errorRecoveryDisabledLanes |= renderWasConcurrent;
                workInProgressRootInterleavedUpdatedLanes |= renderWasConcurrent;
                exitStatus = 4;
                break a;
              }
              renderWasConcurrent = workInProgressRootRecoverableErrors;
              workInProgressRootRecoverableErrors = exitStatus;
              null !== renderWasConcurrent && queueRecoverableErrors(renderWasConcurrent);
            }
            exitStatus = JSCompiler_inline_result;
          }
          renderWasConcurrent = false;
          if (2 !== exitStatus) continue;
        }
      }
      if (1 === exitStatus) {
        prepareFreshStack(root$jscomp$0, 0);
        markRootSuspended(root$jscomp$0, lanes, 0, true);
        break;
      }
      a: {
        shouldTimeSlice = root$jscomp$0;
        switch (exitStatus) {
          case 0:
          case 1:
            throw Error(formatProdErrorMessage(345));
          case 4:
            if ((lanes & 4194176) === lanes) {
              markRootSuspended(
                shouldTimeSlice,
                lanes,
                workInProgressDeferredLane,
                !workInProgressRootDidSkipSuspendedSiblings
              );
              break a;
            }
            break;
          case 2:
            workInProgressRootRecoverableErrors = null;
            break;
          case 3:
          case 5:
            break;
          default:
            throw Error(formatProdErrorMessage(329));
        }
        shouldTimeSlice.finishedWork = forceSync;
        shouldTimeSlice.finishedLanes = lanes;
        if ((lanes & 62914560) === lanes && (renderWasConcurrent = globalMostRecentFallbackTime + 300 - now(), 10 < renderWasConcurrent)) {
          markRootSuspended(
            shouldTimeSlice,
            lanes,
            workInProgressDeferredLane,
            !workInProgressRootDidSkipSuspendedSiblings
          );
          if (0 !== getNextLanes(shouldTimeSlice, 0)) break a;
          shouldTimeSlice.timeoutHandle = scheduleTimeout(
            commitRootWhenReady.bind(
              null,
              shouldTimeSlice,
              forceSync,
              workInProgressRootRecoverableErrors,
              workInProgressTransitions,
              workInProgressRootDidIncludeRecursiveRenderUpdate,
              lanes,
              workInProgressDeferredLane,
              workInProgressRootInterleavedUpdatedLanes,
              workInProgressSuspendedRetryLanes,
              workInProgressRootDidSkipSuspendedSiblings,
              2,
              -0,
              0
            ),
            renderWasConcurrent
          );
          break a;
        }
        commitRootWhenReady(
          shouldTimeSlice,
          forceSync,
          workInProgressRootRecoverableErrors,
          workInProgressTransitions,
          workInProgressRootDidIncludeRecursiveRenderUpdate,
          lanes,
          workInProgressDeferredLane,
          workInProgressRootInterleavedUpdatedLanes,
          workInProgressSuspendedRetryLanes,
          workInProgressRootDidSkipSuspendedSiblings,
          0,
          -0,
          0
        );
      }
    }
    break;
  } while (1);
  ensureRootIsScheduled(root$jscomp$0);
}
function queueRecoverableErrors(errors) {
  null === workInProgressRootRecoverableErrors ? workInProgressRootRecoverableErrors = errors : workInProgressRootRecoverableErrors.push.apply(
    workInProgressRootRecoverableErrors,
    errors
  );
}
function commitRootWhenReady(root2, finishedWork, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, lanes, spawnedLane, updatedLanes, suspendedRetryLanes, didSkipSuspendedSiblings, suspendedCommitReason, completedRenderStartTime, completedRenderEndTime) {
  var subtreeFlags = finishedWork.subtreeFlags;
  if (subtreeFlags & 8192 || 16785408 === (subtreeFlags & 16785408)) {
    if (suspendedState = { stylesheets: null, count: 0, unsuspend: noop }, accumulateSuspenseyCommitOnFiber(finishedWork), finishedWork = waitForCommitToBeReady(), null !== finishedWork) {
      root2.cancelPendingCommit = finishedWork(
        commitRoot.bind(
          null,
          root2,
          recoverableErrors,
          transitions,
          didIncludeRenderPhaseUpdate,
          spawnedLane,
          updatedLanes,
          suspendedRetryLanes,
          1,
          completedRenderStartTime,
          completedRenderEndTime
        )
      );
      markRootSuspended(root2, lanes, spawnedLane, !didSkipSuspendedSiblings);
      return;
    }
  }
  commitRoot(
    root2,
    recoverableErrors,
    transitions,
    didIncludeRenderPhaseUpdate,
    spawnedLane,
    updatedLanes,
    suspendedRetryLanes,
    suspendedCommitReason,
    completedRenderStartTime,
    completedRenderEndTime
  );
}
function isRenderConsistentWithExternalStores(finishedWork) {
  for (var node = finishedWork; ; ) {
    var tag = node.tag;
    if ((0 === tag || 11 === tag || 15 === tag) && node.flags & 16384 && (tag = node.updateQueue, null !== tag && (tag = tag.stores, null !== tag)))
      for (var i = 0; i < tag.length; i++) {
        var check = tag[i], getSnapshot = check.getSnapshot;
        check = check.value;
        try {
          if (!objectIs(getSnapshot(), check)) return false;
        } catch (error) {
          return false;
        }
      }
    tag = node.child;
    if (node.subtreeFlags & 16384 && null !== tag)
      tag.return = node, node = tag;
    else {
      if (node === finishedWork) break;
      for (; null === node.sibling; ) {
        if (null === node.return || node.return === finishedWork) return true;
        node = node.return;
      }
      node.sibling.return = node.return;
      node = node.sibling;
    }
  }
  return true;
}
function markRootSuspended(root2, suspendedLanes, spawnedLane, didAttemptEntireTree) {
  suspendedLanes &= ~workInProgressRootPingedLanes;
  suspendedLanes &= ~workInProgressRootInterleavedUpdatedLanes;
  root2.suspendedLanes |= suspendedLanes;
  root2.pingedLanes &= ~suspendedLanes;
  didAttemptEntireTree && (root2.warmLanes |= suspendedLanes);
  didAttemptEntireTree = root2.expirationTimes;
  for (var lanes = suspendedLanes; 0 < lanes; ) {
    var index$6 = 31 - clz32(lanes), lane = 1 << index$6;
    didAttemptEntireTree[index$6] = -1;
    lanes &= ~lane;
  }
  0 !== spawnedLane && markSpawnedDeferredLane(root2, spawnedLane, suspendedLanes);
}
function flushSyncWork$1() {
  return 0 === (executionContext & 6) ? (flushSyncWorkAcrossRoots_impl(0), false) : true;
}
function resetWorkInProgressStack() {
  if (null !== workInProgress) {
    if (0 === workInProgressSuspendedReason)
      var interruptedWork = workInProgress.return;
    else
      interruptedWork = workInProgress, lastContextDependency = currentlyRenderingFiber = null, resetHooksOnUnwind(interruptedWork), thenableState$1 = null, thenableIndexCounter$1 = 0, interruptedWork = workInProgress;
    for (; null !== interruptedWork; )
      unwindInterruptedWork(interruptedWork.alternate, interruptedWork), interruptedWork = interruptedWork.return;
    workInProgress = null;
  }
}
function prepareFreshStack(root2, lanes) {
  root2.finishedWork = null;
  root2.finishedLanes = 0;
  var timeoutHandle = root2.timeoutHandle;
  -1 !== timeoutHandle && (root2.timeoutHandle = -1, cancelTimeout(timeoutHandle));
  timeoutHandle = root2.cancelPendingCommit;
  null !== timeoutHandle && (root2.cancelPendingCommit = null, timeoutHandle());
  resetWorkInProgressStack();
  workInProgressRoot = root2;
  workInProgress = timeoutHandle = createWorkInProgress(root2.current, null);
  workInProgressRootRenderLanes = lanes;
  workInProgressSuspendedReason = 0;
  workInProgressThrownValue = null;
  workInProgressRootDidSkipSuspendedSiblings = false;
  workInProgressRootIsPrerendering = checkIfRootIsPrerendering(root2, lanes);
  workInProgressRootDidAttachPingListener = false;
  workInProgressSuspendedRetryLanes = workInProgressDeferredLane = workInProgressRootPingedLanes = workInProgressRootInterleavedUpdatedLanes = workInProgressRootSkippedLanes = workInProgressRootExitStatus = 0;
  workInProgressRootRecoverableErrors = workInProgressRootConcurrentErrors = null;
  workInProgressRootDidIncludeRecursiveRenderUpdate = false;
  0 !== (lanes & 8) && (lanes |= lanes & 32);
  var allEntangledLanes = root2.entangledLanes;
  if (0 !== allEntangledLanes)
    for (root2 = root2.entanglements, allEntangledLanes &= lanes; 0 < allEntangledLanes; ) {
      var index$4 = 31 - clz32(allEntangledLanes), lane = 1 << index$4;
      lanes |= root2[index$4];
      allEntangledLanes &= ~lane;
    }
  entangledRenderLanes = lanes;
  finishQueueingConcurrentUpdates();
  return timeoutHandle;
}
function handleThrow(root2, thrownValue) {
  currentlyRenderingFiber$1 = null;
  ReactSharedInternals.H = ContextOnlyDispatcher;
  thrownValue === SuspenseException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = 3) : thrownValue === SuspenseyCommitException ? (thrownValue = getSuspendedThenable(), workInProgressSuspendedReason = 4) : workInProgressSuspendedReason = thrownValue === SelectiveHydrationException ? 8 : null !== thrownValue && "object" === typeof thrownValue && "function" === typeof thrownValue.then ? 6 : 1;
  workInProgressThrownValue = thrownValue;
  null === workInProgress && (workInProgressRootExitStatus = 1, logUncaughtError(
    root2,
    createCapturedValueAtFiber(thrownValue, root2.current)
  ));
}
function pushDispatcher() {
  var prevDispatcher = ReactSharedInternals.H;
  ReactSharedInternals.H = ContextOnlyDispatcher;
  return null === prevDispatcher ? ContextOnlyDispatcher : prevDispatcher;
}
function pushAsyncDispatcher() {
  var prevAsyncDispatcher = ReactSharedInternals.A;
  ReactSharedInternals.A = DefaultAsyncDispatcher;
  return prevAsyncDispatcher;
}
function renderDidSuspendDelayIfPossible() {
  workInProgressRootExitStatus = 4;
  workInProgressRootDidSkipSuspendedSiblings || (workInProgressRootRenderLanes & 4194176) !== workInProgressRootRenderLanes && null !== suspenseHandlerStackCursor.current || (workInProgressRootIsPrerendering = true);
  0 === (workInProgressRootSkippedLanes & 134217727) && 0 === (workInProgressRootInterleavedUpdatedLanes & 134217727) || null === workInProgressRoot || markRootSuspended(
    workInProgressRoot,
    workInProgressRootRenderLanes,
    workInProgressDeferredLane,
    false
  );
}
function renderRootSync(root2, lanes, shouldYieldForPrerendering) {
  var prevExecutionContext = executionContext;
  executionContext |= 2;
  var prevDispatcher = pushDispatcher(), prevAsyncDispatcher = pushAsyncDispatcher();
  if (workInProgressRoot !== root2 || workInProgressRootRenderLanes !== lanes)
    workInProgressTransitions = null, prepareFreshStack(root2, lanes);
  lanes = false;
  var exitStatus = workInProgressRootExitStatus;
  a: do
    try {
      if (0 !== workInProgressSuspendedReason && null !== workInProgress) {
        var unitOfWork = workInProgress, thrownValue = workInProgressThrownValue;
        switch (workInProgressSuspendedReason) {
          case 8:
            resetWorkInProgressStack();
            exitStatus = 6;
            break a;
          case 3:
          case 2:
          case 6:
            null === suspenseHandlerStackCursor.current && (lanes = true);
            var reason = workInProgressSuspendedReason;
            workInProgressSuspendedReason = 0;
            workInProgressThrownValue = null;
            throwAndUnwindWorkLoop(root2, unitOfWork, thrownValue, reason);
            if (shouldYieldForPrerendering && workInProgressRootIsPrerendering) {
              exitStatus = 0;
              break a;
            }
            break;
          default:
            reason = workInProgressSuspendedReason, workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root2, unitOfWork, thrownValue, reason);
        }
      }
      workLoopSync();
      exitStatus = workInProgressRootExitStatus;
      break;
    } catch (thrownValue$164) {
      handleThrow(root2, thrownValue$164);
    }
  while (1);
  lanes && root2.shellSuspendCounter++;
  lastContextDependency = currentlyRenderingFiber = null;
  executionContext = prevExecutionContext;
  ReactSharedInternals.H = prevDispatcher;
  ReactSharedInternals.A = prevAsyncDispatcher;
  null === workInProgress && (workInProgressRoot = null, workInProgressRootRenderLanes = 0, finishQueueingConcurrentUpdates());
  return exitStatus;
}
function workLoopSync() {
  for (; null !== workInProgress; ) performUnitOfWork(workInProgress);
}
function renderRootConcurrent(root2, lanes) {
  var prevExecutionContext = executionContext;
  executionContext |= 2;
  var prevDispatcher = pushDispatcher(), prevAsyncDispatcher = pushAsyncDispatcher();
  workInProgressRoot !== root2 || workInProgressRootRenderLanes !== lanes ? (workInProgressTransitions = null, workInProgressRootRenderTargetTime = now() + 500, prepareFreshStack(root2, lanes)) : workInProgressRootIsPrerendering = checkIfRootIsPrerendering(
    root2,
    lanes
  );
  a: do
    try {
      if (0 !== workInProgressSuspendedReason && null !== workInProgress) {
        lanes = workInProgress;
        var thrownValue = workInProgressThrownValue;
        b: switch (workInProgressSuspendedReason) {
          case 1:
            workInProgressSuspendedReason = 0;
            workInProgressThrownValue = null;
            throwAndUnwindWorkLoop(root2, lanes, thrownValue, 1);
            break;
          case 2:
            if (isThenableResolved(thrownValue)) {
              workInProgressSuspendedReason = 0;
              workInProgressThrownValue = null;
              replaySuspendedUnitOfWork(lanes);
              break;
            }
            lanes = function() {
              2 === workInProgressSuspendedReason && workInProgressRoot === root2 && (workInProgressSuspendedReason = 7);
              ensureRootIsScheduled(root2);
            };
            thrownValue.then(lanes, lanes);
            break a;
          case 3:
            workInProgressSuspendedReason = 7;
            break a;
          case 4:
            workInProgressSuspendedReason = 5;
            break a;
          case 7:
            isThenableResolved(thrownValue) ? (workInProgressSuspendedReason = 0, workInProgressThrownValue = null, replaySuspendedUnitOfWork(lanes)) : (workInProgressSuspendedReason = 0, workInProgressThrownValue = null, throwAndUnwindWorkLoop(root2, lanes, thrownValue, 7));
            break;
          case 5:
            var resource = null;
            switch (workInProgress.tag) {
              case 26:
                resource = workInProgress.memoizedState;
              case 5:
              case 27:
                var hostFiber = workInProgress;
                if (resource ? preloadResource(resource) : 1) {
                  workInProgressSuspendedReason = 0;
                  workInProgressThrownValue = null;
                  var sibling = hostFiber.sibling;
                  if (null !== sibling) workInProgress = sibling;
                  else {
                    var returnFiber = hostFiber.return;
                    null !== returnFiber ? (workInProgress = returnFiber, completeUnitOfWork(returnFiber)) : workInProgress = null;
                  }
                  break b;
                }
            }
            workInProgressSuspendedReason = 0;
            workInProgressThrownValue = null;
            throwAndUnwindWorkLoop(root2, lanes, thrownValue, 5);
            break;
          case 6:
            workInProgressSuspendedReason = 0;
            workInProgressThrownValue = null;
            throwAndUnwindWorkLoop(root2, lanes, thrownValue, 6);
            break;
          case 8:
            resetWorkInProgressStack();
            workInProgressRootExitStatus = 6;
            break a;
          default:
            throw Error(formatProdErrorMessage(462));
        }
      }
      workLoopConcurrent();
      break;
    } catch (thrownValue$166) {
      handleThrow(root2, thrownValue$166);
    }
  while (1);
  lastContextDependency = currentlyRenderingFiber = null;
  ReactSharedInternals.H = prevDispatcher;
  ReactSharedInternals.A = prevAsyncDispatcher;
  executionContext = prevExecutionContext;
  if (null !== workInProgress) return 0;
  workInProgressRoot = null;
  workInProgressRootRenderLanes = 0;
  finishQueueingConcurrentUpdates();
  return workInProgressRootExitStatus;
}
function workLoopConcurrent() {
  for (; null !== workInProgress && !shouldYield(); )
    performUnitOfWork(workInProgress);
}
function performUnitOfWork(unitOfWork) {
  var next = beginWork(unitOfWork.alternate, unitOfWork, entangledRenderLanes);
  unitOfWork.memoizedProps = unitOfWork.pendingProps;
  null === next ? completeUnitOfWork(unitOfWork) : workInProgress = next;
}
function replaySuspendedUnitOfWork(unitOfWork) {
  var next = unitOfWork;
  var current = next.alternate;
  switch (next.tag) {
    case 15:
    case 0:
      next = replayFunctionComponent(
        current,
        next,
        next.pendingProps,
        next.type,
        void 0,
        workInProgressRootRenderLanes
      );
      break;
    case 11:
      next = replayFunctionComponent(
        current,
        next,
        next.pendingProps,
        next.type.render,
        next.ref,
        workInProgressRootRenderLanes
      );
      break;
    case 5:
      resetHooksOnUnwind(next);
    default:
      unwindInterruptedWork(current, next), next = workInProgress = resetWorkInProgress(next, entangledRenderLanes), next = beginWork(current, next, entangledRenderLanes);
  }
  unitOfWork.memoizedProps = unitOfWork.pendingProps;
  null === next ? completeUnitOfWork(unitOfWork) : workInProgress = next;
}
function throwAndUnwindWorkLoop(root2, unitOfWork, thrownValue, suspendedReason) {
  lastContextDependency = currentlyRenderingFiber = null;
  resetHooksOnUnwind(unitOfWork);
  thenableState$1 = null;
  thenableIndexCounter$1 = 0;
  var returnFiber = unitOfWork.return;
  try {
    if (throwException(
      root2,
      returnFiber,
      unitOfWork,
      thrownValue,
      workInProgressRootRenderLanes
    )) {
      workInProgressRootExitStatus = 1;
      logUncaughtError(
        root2,
        createCapturedValueAtFiber(thrownValue, root2.current)
      );
      workInProgress = null;
      return;
    }
  } catch (error) {
    if (null !== returnFiber) throw workInProgress = returnFiber, error;
    workInProgressRootExitStatus = 1;
    logUncaughtError(
      root2,
      createCapturedValueAtFiber(thrownValue, root2.current)
    );
    workInProgress = null;
    return;
  }
  if (unitOfWork.flags & 32768) {
    if (isHydrating || 1 === suspendedReason) root2 = true;
    else if (workInProgressRootIsPrerendering || 0 !== (workInProgressRootRenderLanes & 536870912))
      root2 = false;
    else if (workInProgressRootDidSkipSuspendedSiblings = root2 = true, 2 === suspendedReason || 3 === suspendedReason || 6 === suspendedReason)
      suspendedReason = suspenseHandlerStackCursor.current, null !== suspendedReason && 13 === suspendedReason.tag && (suspendedReason.flags |= 16384);
    unwindUnitOfWork(unitOfWork, root2);
  } else completeUnitOfWork(unitOfWork);
}
function completeUnitOfWork(unitOfWork) {
  var completedWork = unitOfWork;
  do {
    if (0 !== (completedWork.flags & 32768)) {
      unwindUnitOfWork(
        completedWork,
        workInProgressRootDidSkipSuspendedSiblings
      );
      return;
    }
    unitOfWork = completedWork.return;
    var next = completeWork(
      completedWork.alternate,
      completedWork,
      entangledRenderLanes
    );
    if (null !== next) {
      workInProgress = next;
      return;
    }
    completedWork = completedWork.sibling;
    if (null !== completedWork) {
      workInProgress = completedWork;
      return;
    }
    workInProgress = completedWork = unitOfWork;
  } while (null !== completedWork);
  0 === workInProgressRootExitStatus && (workInProgressRootExitStatus = 5);
}
function unwindUnitOfWork(unitOfWork, skipSiblings) {
  do {
    var next = unwindWork(unitOfWork.alternate, unitOfWork);
    if (null !== next) {
      next.flags &= 32767;
      workInProgress = next;
      return;
    }
    next = unitOfWork.return;
    null !== next && (next.flags |= 32768, next.subtreeFlags = 0, next.deletions = null);
    if (!skipSiblings && (unitOfWork = unitOfWork.sibling, null !== unitOfWork)) {
      workInProgress = unitOfWork;
      return;
    }
    workInProgress = unitOfWork = next;
  } while (null !== unitOfWork);
  workInProgressRootExitStatus = 6;
  workInProgress = null;
}
function commitRoot(root2, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, spawnedLane, updatedLanes, suspendedRetryLanes, suspendedCommitReason, completedRenderStartTime, completedRenderEndTime) {
  var prevTransition = ReactSharedInternals.T, previousUpdateLanePriority = ReactDOMSharedInternals.p;
  try {
    ReactDOMSharedInternals.p = 2, ReactSharedInternals.T = null, commitRootImpl(
      root2,
      recoverableErrors,
      transitions,
      didIncludeRenderPhaseUpdate,
      previousUpdateLanePriority,
      spawnedLane,
      updatedLanes,
      suspendedRetryLanes,
      suspendedCommitReason,
      completedRenderStartTime,
      completedRenderEndTime
    );
  } finally {
    ReactSharedInternals.T = prevTransition, ReactDOMSharedInternals.p = previousUpdateLanePriority;
  }
}
function commitRootImpl(root2, recoverableErrors, transitions, didIncludeRenderPhaseUpdate, renderPriorityLevel, spawnedLane, updatedLanes, suspendedRetryLanes) {
  do
    flushPassiveEffects();
  while (null !== rootWithPendingPassiveEffects);
  if (0 !== (executionContext & 6)) throw Error(formatProdErrorMessage(327));
  var finishedWork = root2.finishedWork;
  didIncludeRenderPhaseUpdate = root2.finishedLanes;
  if (null === finishedWork) return null;
  root2.finishedWork = null;
  root2.finishedLanes = 0;
  if (finishedWork === root2.current) throw Error(formatProdErrorMessage(177));
  root2.callbackNode = null;
  root2.callbackPriority = 0;
  root2.cancelPendingCommit = null;
  var remainingLanes = finishedWork.lanes | finishedWork.childLanes;
  remainingLanes |= concurrentlyUpdatedLanes;
  markRootFinished(
    root2,
    didIncludeRenderPhaseUpdate,
    remainingLanes,
    spawnedLane,
    updatedLanes,
    suspendedRetryLanes
  );
  root2 === workInProgressRoot && (workInProgress = workInProgressRoot = null, workInProgressRootRenderLanes = 0);
  0 === (finishedWork.subtreeFlags & 10256) && 0 === (finishedWork.flags & 10256) || rootDoesHavePassiveEffects || (rootDoesHavePassiveEffects = true, pendingPassiveEffectsRemainingLanes = remainingLanes, pendingPassiveTransitions = transitions, scheduleCallback$1(NormalPriority$1, function() {
    flushPassiveEffects();
    return null;
  }));
  transitions = 0 !== (finishedWork.flags & 15990);
  0 !== (finishedWork.subtreeFlags & 15990) || transitions ? (transitions = ReactSharedInternals.T, ReactSharedInternals.T = null, spawnedLane = ReactDOMSharedInternals.p, ReactDOMSharedInternals.p = 2, updatedLanes = executionContext, executionContext |= 4, commitBeforeMutationEffects(root2, finishedWork), commitMutationEffectsOnFiber(finishedWork, root2), restoreSelection(selectionInformation, root2.containerInfo), _enabled = !!eventsEnabled, selectionInformation = eventsEnabled = null, root2.current = finishedWork, commitLayoutEffectOnFiber(root2, finishedWork.alternate, finishedWork), requestPaint(), executionContext = updatedLanes, ReactDOMSharedInternals.p = spawnedLane, ReactSharedInternals.T = transitions) : root2.current = finishedWork;
  rootDoesHavePassiveEffects ? (rootDoesHavePassiveEffects = false, rootWithPendingPassiveEffects = root2, pendingPassiveEffectsLanes = didIncludeRenderPhaseUpdate) : releaseRootPooledCache(root2, remainingLanes);
  remainingLanes = root2.pendingLanes;
  0 === remainingLanes && (legacyErrorBoundariesThatAlreadyFailed = null);
  onCommitRoot(finishedWork.stateNode);
  ensureRootIsScheduled(root2);
  if (null !== recoverableErrors)
    for (renderPriorityLevel = root2.onRecoverableError, finishedWork = 0; finishedWork < recoverableErrors.length; finishedWork++)
      remainingLanes = recoverableErrors[finishedWork], renderPriorityLevel(remainingLanes.value, {
        componentStack: remainingLanes.stack
      });
  0 !== (pendingPassiveEffectsLanes & 3) && flushPassiveEffects();
  remainingLanes = root2.pendingLanes;
  0 !== (didIncludeRenderPhaseUpdate & 4194218) && 0 !== (remainingLanes & 42) ? root2 === rootWithNestedUpdates ? nestedUpdateCount++ : (nestedUpdateCount = 0, rootWithNestedUpdates = root2) : nestedUpdateCount = 0;
  flushSyncWorkAcrossRoots_impl(0);
  return null;
}
function releaseRootPooledCache(root2, remainingLanes) {
  0 === (root2.pooledCacheLanes &= remainingLanes) && (remainingLanes = root2.pooledCache, null != remainingLanes && (root2.pooledCache = null, releaseCache(remainingLanes)));
}
function flushPassiveEffects() {
  if (null !== rootWithPendingPassiveEffects) {
    var root$170 = rootWithPendingPassiveEffects, remainingLanes = pendingPassiveEffectsRemainingLanes;
    pendingPassiveEffectsRemainingLanes = 0;
    var renderPriority = lanesToEventPriority(pendingPassiveEffectsLanes), prevTransition = ReactSharedInternals.T, previousPriority = ReactDOMSharedInternals.p;
    try {
      ReactDOMSharedInternals.p = 32 > renderPriority ? 32 : renderPriority;
      ReactSharedInternals.T = null;
      if (null === rootWithPendingPassiveEffects)
        var JSCompiler_inline_result = false;
      else {
        renderPriority = pendingPassiveTransitions;
        pendingPassiveTransitions = null;
        var root2 = rootWithPendingPassiveEffects, lanes = pendingPassiveEffectsLanes;
        rootWithPendingPassiveEffects = null;
        pendingPassiveEffectsLanes = 0;
        if (0 !== (executionContext & 6))
          throw Error(formatProdErrorMessage(331));
        var prevExecutionContext = executionContext;
        executionContext |= 4;
        commitPassiveUnmountOnFiber(root2.current);
        commitPassiveMountOnFiber(root2, root2.current, lanes, renderPriority);
        executionContext = prevExecutionContext;
        flushSyncWorkAcrossRoots_impl(0, false);
        if (injectedHook && "function" === typeof injectedHook.onPostCommitFiberRoot)
          try {
            injectedHook.onPostCommitFiberRoot(rendererID, root2);
          } catch (err) {
          }
        JSCompiler_inline_result = true;
      }
      return JSCompiler_inline_result;
    } finally {
      ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition, releaseRootPooledCache(root$170, remainingLanes);
    }
  }
  return false;
}
function captureCommitPhaseErrorOnRoot(rootFiber, sourceFiber, error) {
  sourceFiber = createCapturedValueAtFiber(error, sourceFiber);
  sourceFiber = createRootErrorUpdate(rootFiber.stateNode, sourceFiber, 2);
  rootFiber = enqueueUpdate(rootFiber, sourceFiber, 2);
  null !== rootFiber && (markRootUpdated$1(rootFiber, 2), ensureRootIsScheduled(rootFiber));
}
function captureCommitPhaseError(sourceFiber, nearestMountedAncestor, error) {
  if (3 === sourceFiber.tag)
    captureCommitPhaseErrorOnRoot(sourceFiber, sourceFiber, error);
  else
    for (; null !== nearestMountedAncestor; ) {
      if (3 === nearestMountedAncestor.tag) {
        captureCommitPhaseErrorOnRoot(
          nearestMountedAncestor,
          sourceFiber,
          error
        );
        break;
      } else if (1 === nearestMountedAncestor.tag) {
        var instance = nearestMountedAncestor.stateNode;
        if ("function" === typeof nearestMountedAncestor.type.getDerivedStateFromError || "function" === typeof instance.componentDidCatch && (null === legacyErrorBoundariesThatAlreadyFailed || !legacyErrorBoundariesThatAlreadyFailed.has(instance))) {
          sourceFiber = createCapturedValueAtFiber(error, sourceFiber);
          error = createClassErrorUpdate(2);
          instance = enqueueUpdate(nearestMountedAncestor, error, 2);
          null !== instance && (initializeClassErrorUpdate(
            error,
            instance,
            nearestMountedAncestor,
            sourceFiber
          ), markRootUpdated$1(instance, 2), ensureRootIsScheduled(instance));
          break;
        }
      }
      nearestMountedAncestor = nearestMountedAncestor.return;
    }
}
function attachPingListener(root2, wakeable, lanes) {
  var pingCache = root2.pingCache;
  if (null === pingCache) {
    pingCache = root2.pingCache = new PossiblyWeakMap();
    var threadIDs = /* @__PURE__ */ new Set();
    pingCache.set(wakeable, threadIDs);
  } else
    threadIDs = pingCache.get(wakeable), void 0 === threadIDs && (threadIDs = /* @__PURE__ */ new Set(), pingCache.set(wakeable, threadIDs));
  threadIDs.has(lanes) || (workInProgressRootDidAttachPingListener = true, threadIDs.add(lanes), root2 = pingSuspendedRoot.bind(null, root2, wakeable, lanes), wakeable.then(root2, root2));
}
function pingSuspendedRoot(root2, wakeable, pingedLanes) {
  var pingCache = root2.pingCache;
  null !== pingCache && pingCache.delete(wakeable);
  root2.pingedLanes |= root2.suspendedLanes & pingedLanes;
  root2.warmLanes &= ~pingedLanes;
  workInProgressRoot === root2 && (workInProgressRootRenderLanes & pingedLanes) === pingedLanes && (4 === workInProgressRootExitStatus || 3 === workInProgressRootExitStatus && (workInProgressRootRenderLanes & 62914560) === workInProgressRootRenderLanes && 300 > now() - globalMostRecentFallbackTime ? 0 === (executionContext & 2) && prepareFreshStack(root2, 0) : workInProgressRootPingedLanes |= pingedLanes, workInProgressSuspendedRetryLanes === workInProgressRootRenderLanes && (workInProgressSuspendedRetryLanes = 0));
  ensureRootIsScheduled(root2);
}
function retryTimedOutBoundary(boundaryFiber, retryLane) {
  0 === retryLane && (retryLane = claimNextRetryLane());
  boundaryFiber = enqueueConcurrentRenderForLane(boundaryFiber, retryLane);
  null !== boundaryFiber && (markRootUpdated$1(boundaryFiber, retryLane), ensureRootIsScheduled(boundaryFiber));
}
function retryDehydratedSuspenseBoundary(boundaryFiber) {
  var suspenseState = boundaryFiber.memoizedState, retryLane = 0;
  null !== suspenseState && (retryLane = suspenseState.retryLane);
  retryTimedOutBoundary(boundaryFiber, retryLane);
}
function resolveRetryWakeable(boundaryFiber, wakeable) {
  var retryLane = 0;
  switch (boundaryFiber.tag) {
    case 13:
      var retryCache = boundaryFiber.stateNode;
      var suspenseState = boundaryFiber.memoizedState;
      null !== suspenseState && (retryLane = suspenseState.retryLane);
      break;
    case 19:
      retryCache = boundaryFiber.stateNode;
      break;
    case 22:
      retryCache = boundaryFiber.stateNode._retryCache;
      break;
    default:
      throw Error(formatProdErrorMessage(314));
  }
  null !== retryCache && retryCache.delete(wakeable);
  retryTimedOutBoundary(boundaryFiber, retryLane);
}
function scheduleCallback$1(priorityLevel, callback) {
  return scheduleCallback$3(priorityLevel, callback);
}
var firstScheduledRoot = null, lastScheduledRoot = null, didScheduleMicrotask = false, mightHavePendingSyncWork = false, isFlushingWork = false, currentEventTransitionLane = 0;
function ensureRootIsScheduled(root2) {
  root2 !== lastScheduledRoot && null === root2.next && (null === lastScheduledRoot ? firstScheduledRoot = lastScheduledRoot = root2 : lastScheduledRoot = lastScheduledRoot.next = root2);
  mightHavePendingSyncWork = true;
  didScheduleMicrotask || (didScheduleMicrotask = true, scheduleImmediateTask(processRootScheduleInMicrotask));
}
function flushSyncWorkAcrossRoots_impl(syncTransitionLanes, onlyLegacy) {
  if (!isFlushingWork && mightHavePendingSyncWork) {
    isFlushingWork = true;
    do {
      var didPerformSomeWork = false;
      for (var root$172 = firstScheduledRoot; null !== root$172; ) {
        if (0 !== syncTransitionLanes) {
          var pendingLanes = root$172.pendingLanes;
          if (0 === pendingLanes) var JSCompiler_inline_result = 0;
          else {
            var suspendedLanes = root$172.suspendedLanes, pingedLanes = root$172.pingedLanes;
            JSCompiler_inline_result = (1 << 31 - clz32(42 | syncTransitionLanes) + 1) - 1;
            JSCompiler_inline_result &= pendingLanes & ~(suspendedLanes & ~pingedLanes);
            JSCompiler_inline_result = JSCompiler_inline_result & 201326677 ? JSCompiler_inline_result & 201326677 | 1 : JSCompiler_inline_result ? JSCompiler_inline_result | 2 : 0;
          }
          0 !== JSCompiler_inline_result && (didPerformSomeWork = true, performSyncWorkOnRoot(root$172, JSCompiler_inline_result));
        } else
          JSCompiler_inline_result = workInProgressRootRenderLanes, JSCompiler_inline_result = getNextLanes(
            root$172,
            root$172 === workInProgressRoot ? JSCompiler_inline_result : 0
          ), 0 === (JSCompiler_inline_result & 3) || checkIfRootIsPrerendering(root$172, JSCompiler_inline_result) || (didPerformSomeWork = true, performSyncWorkOnRoot(root$172, JSCompiler_inline_result));
        root$172 = root$172.next;
      }
    } while (didPerformSomeWork);
    isFlushingWork = false;
  }
}
function processRootScheduleInMicrotask() {
  mightHavePendingSyncWork = didScheduleMicrotask = false;
  var syncTransitionLanes = 0;
  0 !== currentEventTransitionLane && (shouldAttemptEagerTransition() && (syncTransitionLanes = currentEventTransitionLane), currentEventTransitionLane = 0);
  for (var currentTime = now(), prev = null, root2 = firstScheduledRoot; null !== root2; ) {
    var next = root2.next, nextLanes = scheduleTaskForRootDuringMicrotask(root2, currentTime);
    if (0 === nextLanes)
      root2.next = null, null === prev ? firstScheduledRoot = next : prev.next = next, null === next && (lastScheduledRoot = prev);
    else if (prev = root2, 0 !== syncTransitionLanes || 0 !== (nextLanes & 3))
      mightHavePendingSyncWork = true;
    root2 = next;
  }
  flushSyncWorkAcrossRoots_impl(syncTransitionLanes);
}
function scheduleTaskForRootDuringMicrotask(root2, currentTime) {
  for (var suspendedLanes = root2.suspendedLanes, pingedLanes = root2.pingedLanes, expirationTimes = root2.expirationTimes, lanes = root2.pendingLanes & -62914561; 0 < lanes; ) {
    var index$5 = 31 - clz32(lanes), lane = 1 << index$5, expirationTime = expirationTimes[index$5];
    if (-1 === expirationTime) {
      if (0 === (lane & suspendedLanes) || 0 !== (lane & pingedLanes))
        expirationTimes[index$5] = computeExpirationTime(lane, currentTime);
    } else expirationTime <= currentTime && (root2.expiredLanes |= lane);
    lanes &= ~lane;
  }
  currentTime = workInProgressRoot;
  suspendedLanes = workInProgressRootRenderLanes;
  suspendedLanes = getNextLanes(
    root2,
    root2 === currentTime ? suspendedLanes : 0
  );
  pingedLanes = root2.callbackNode;
  if (0 === suspendedLanes || root2 === currentTime && 2 === workInProgressSuspendedReason || null !== root2.cancelPendingCommit)
    return null !== pingedLanes && null !== pingedLanes && cancelCallback$1(pingedLanes), root2.callbackNode = null, root2.callbackPriority = 0;
  if (0 === (suspendedLanes & 3) || checkIfRootIsPrerendering(root2, suspendedLanes)) {
    currentTime = suspendedLanes & -suspendedLanes;
    if (currentTime === root2.callbackPriority) return currentTime;
    null !== pingedLanes && cancelCallback$1(pingedLanes);
    switch (lanesToEventPriority(suspendedLanes)) {
      case 2:
      case 8:
        suspendedLanes = UserBlockingPriority;
        break;
      case 32:
        suspendedLanes = NormalPriority$1;
        break;
      case 268435456:
        suspendedLanes = IdlePriority;
        break;
      default:
        suspendedLanes = NormalPriority$1;
    }
    pingedLanes = performWorkOnRootViaSchedulerTask.bind(null, root2);
    suspendedLanes = scheduleCallback$3(suspendedLanes, pingedLanes);
    root2.callbackPriority = currentTime;
    root2.callbackNode = suspendedLanes;
    return currentTime;
  }
  null !== pingedLanes && null !== pingedLanes && cancelCallback$1(pingedLanes);
  root2.callbackPriority = 2;
  root2.callbackNode = null;
  return 2;
}
function performWorkOnRootViaSchedulerTask(root2, didTimeout) {
  var originalCallbackNode = root2.callbackNode;
  if (flushPassiveEffects() && root2.callbackNode !== originalCallbackNode)
    return null;
  var workInProgressRootRenderLanes$jscomp$0 = workInProgressRootRenderLanes;
  workInProgressRootRenderLanes$jscomp$0 = getNextLanes(
    root2,
    root2 === workInProgressRoot ? workInProgressRootRenderLanes$jscomp$0 : 0
  );
  if (0 === workInProgressRootRenderLanes$jscomp$0) return null;
  performWorkOnRoot(root2, workInProgressRootRenderLanes$jscomp$0, didTimeout);
  scheduleTaskForRootDuringMicrotask(root2, now());
  return null != root2.callbackNode && root2.callbackNode === originalCallbackNode ? performWorkOnRootViaSchedulerTask.bind(null, root2) : null;
}
function performSyncWorkOnRoot(root2, lanes) {
  if (flushPassiveEffects()) return null;
  performWorkOnRoot(root2, lanes, true);
}
function scheduleImmediateTask(cb) {
  scheduleMicrotask(function() {
    0 !== (executionContext & 6) ? scheduleCallback$3(ImmediatePriority, cb) : cb();
  });
}
function requestTransitionLane() {
  0 === currentEventTransitionLane && (currentEventTransitionLane = claimNextTransitionLane());
  return currentEventTransitionLane;
}
function coerceFormActionProp(actionProp) {
  return null == actionProp || "symbol" === typeof actionProp || "boolean" === typeof actionProp ? null : "function" === typeof actionProp ? actionProp : sanitizeURL("" + actionProp);
}
function createFormDataWithSubmitter(form, submitter) {
  var temp = submitter.ownerDocument.createElement("input");
  temp.name = submitter.name;
  temp.value = submitter.value;
  form.id && temp.setAttribute("form", form.id);
  submitter.parentNode.insertBefore(temp, submitter);
  form = new FormData(form);
  temp.parentNode.removeChild(temp);
  return form;
}
function extractEvents$1(dispatchQueue, domEventName, maybeTargetInst, nativeEvent, nativeEventTarget) {
  if ("submit" === domEventName && maybeTargetInst && maybeTargetInst.stateNode === nativeEventTarget) {
    var action = coerceFormActionProp(
      (nativeEventTarget[internalPropsKey] || null).action
    ), submitter = nativeEvent.submitter;
    submitter && (domEventName = (domEventName = submitter[internalPropsKey] || null) ? coerceFormActionProp(domEventName.formAction) : submitter.getAttribute("formAction"), null !== domEventName && (action = domEventName, submitter = null));
    var event = new SyntheticEvent(
      "action",
      "action",
      null,
      nativeEvent,
      nativeEventTarget
    );
    dispatchQueue.push({
      event,
      listeners: [
        {
          instance: null,
          listener: function() {
            if (nativeEvent.defaultPrevented) {
              if (0 !== currentEventTransitionLane) {
                var formData = submitter ? createFormDataWithSubmitter(nativeEventTarget, submitter) : new FormData(nativeEventTarget);
                startHostTransition(
                  maybeTargetInst,
                  {
                    pending: true,
                    data: formData,
                    method: nativeEventTarget.method,
                    action
                  },
                  null,
                  formData
                );
              }
            } else
              "function" === typeof action && (event.preventDefault(), formData = submitter ? createFormDataWithSubmitter(nativeEventTarget, submitter) : new FormData(nativeEventTarget), startHostTransition(
                maybeTargetInst,
                {
                  pending: true,
                  data: formData,
                  method: nativeEventTarget.method,
                  action
                },
                action,
                formData
              ));
          },
          currentTarget: nativeEventTarget
        }
      ]
    });
  }
}
for (var i$jscomp$inline_1439 = 0; i$jscomp$inline_1439 < simpleEventPluginEvents.length; i$jscomp$inline_1439++) {
  var eventName$jscomp$inline_1440 = simpleEventPluginEvents[i$jscomp$inline_1439], domEventName$jscomp$inline_1441 = eventName$jscomp$inline_1440.toLowerCase(), capitalizedEvent$jscomp$inline_1442 = eventName$jscomp$inline_1440[0].toUpperCase() + eventName$jscomp$inline_1440.slice(1);
  registerSimpleEvent(
    domEventName$jscomp$inline_1441,
    "on" + capitalizedEvent$jscomp$inline_1442
  );
}
registerSimpleEvent(ANIMATION_END, "onAnimationEnd");
registerSimpleEvent(ANIMATION_ITERATION, "onAnimationIteration");
registerSimpleEvent(ANIMATION_START, "onAnimationStart");
registerSimpleEvent("dblclick", "onDoubleClick");
registerSimpleEvent("focusin", "onFocus");
registerSimpleEvent("focusout", "onBlur");
registerSimpleEvent(TRANSITION_RUN, "onTransitionRun");
registerSimpleEvent(TRANSITION_START, "onTransitionStart");
registerSimpleEvent(TRANSITION_CANCEL, "onTransitionCancel");
registerSimpleEvent(TRANSITION_END, "onTransitionEnd");
registerDirectEvent("onMouseEnter", ["mouseout", "mouseover"]);
registerDirectEvent("onMouseLeave", ["mouseout", "mouseover"]);
registerDirectEvent("onPointerEnter", ["pointerout", "pointerover"]);
registerDirectEvent("onPointerLeave", ["pointerout", "pointerover"]);
registerTwoPhaseEvent(
  "onChange",
  "change click focusin focusout input keydown keyup selectionchange".split(" ")
);
registerTwoPhaseEvent(
  "onSelect",
  "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(
    " "
  )
);
registerTwoPhaseEvent("onBeforeInput", [
  "compositionend",
  "keypress",
  "textInput",
  "paste"
]);
registerTwoPhaseEvent(
  "onCompositionEnd",
  "compositionend focusout keydown keypress keyup mousedown".split(" ")
);
registerTwoPhaseEvent(
  "onCompositionStart",
  "compositionstart focusout keydown keypress keyup mousedown".split(" ")
);
registerTwoPhaseEvent(
  "onCompositionUpdate",
  "compositionupdate focusout keydown keypress keyup mousedown".split(" ")
);
var mediaEventTypes = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(
  " "
), nonDelegatedEvents = new Set(
  "beforetoggle cancel close invalid load scroll scrollend toggle".split(" ").concat(mediaEventTypes)
);
function processDispatchQueue(dispatchQueue, eventSystemFlags) {
  eventSystemFlags = 0 !== (eventSystemFlags & 4);
  for (var i = 0; i < dispatchQueue.length; i++) {
    var _dispatchQueue$i = dispatchQueue[i], event = _dispatchQueue$i.event;
    _dispatchQueue$i = _dispatchQueue$i.listeners;
    a: {
      var previousInstance = void 0;
      if (eventSystemFlags)
        for (var i$jscomp$0 = _dispatchQueue$i.length - 1; 0 <= i$jscomp$0; i$jscomp$0--) {
          var _dispatchListeners$i = _dispatchQueue$i[i$jscomp$0], instance = _dispatchListeners$i.instance, currentTarget = _dispatchListeners$i.currentTarget;
          _dispatchListeners$i = _dispatchListeners$i.listener;
          if (instance !== previousInstance && event.isPropagationStopped())
            break a;
          previousInstance = _dispatchListeners$i;
          event.currentTarget = currentTarget;
          try {
            previousInstance(event);
          } catch (error) {
            reportGlobalError(error);
          }
          event.currentTarget = null;
          previousInstance = instance;
        }
      else
        for (i$jscomp$0 = 0; i$jscomp$0 < _dispatchQueue$i.length; i$jscomp$0++) {
          _dispatchListeners$i = _dispatchQueue$i[i$jscomp$0];
          instance = _dispatchListeners$i.instance;
          currentTarget = _dispatchListeners$i.currentTarget;
          _dispatchListeners$i = _dispatchListeners$i.listener;
          if (instance !== previousInstance && event.isPropagationStopped())
            break a;
          previousInstance = _dispatchListeners$i;
          event.currentTarget = currentTarget;
          try {
            previousInstance(event);
          } catch (error) {
            reportGlobalError(error);
          }
          event.currentTarget = null;
          previousInstance = instance;
        }
    }
  }
}
function listenToNonDelegatedEvent(domEventName, targetElement) {
  var JSCompiler_inline_result = targetElement[internalEventHandlersKey];
  void 0 === JSCompiler_inline_result && (JSCompiler_inline_result = targetElement[internalEventHandlersKey] = /* @__PURE__ */ new Set());
  var listenerSetKey = domEventName + "__bubble";
  JSCompiler_inline_result.has(listenerSetKey) || (addTrappedEventListener(targetElement, domEventName, 2, false), JSCompiler_inline_result.add(listenerSetKey));
}
function listenToNativeEvent(domEventName, isCapturePhaseListener, target) {
  var eventSystemFlags = 0;
  isCapturePhaseListener && (eventSystemFlags |= 4);
  addTrappedEventListener(
    target,
    domEventName,
    eventSystemFlags,
    isCapturePhaseListener
  );
}
var listeningMarker = "_reactListening" + Math.random().toString(36).slice(2);
function listenToAllSupportedEvents(rootContainerElement) {
  if (!rootContainerElement[listeningMarker]) {
    rootContainerElement[listeningMarker] = true;
    allNativeEvents.forEach(function(domEventName) {
      "selectionchange" !== domEventName && (nonDelegatedEvents.has(domEventName) || listenToNativeEvent(domEventName, false, rootContainerElement), listenToNativeEvent(domEventName, true, rootContainerElement));
    });
    var ownerDocument = 9 === rootContainerElement.nodeType ? rootContainerElement : rootContainerElement.ownerDocument;
    null === ownerDocument || ownerDocument[listeningMarker] || (ownerDocument[listeningMarker] = true, listenToNativeEvent("selectionchange", false, ownerDocument));
  }
}
function addTrappedEventListener(targetContainer, domEventName, eventSystemFlags, isCapturePhaseListener) {
  switch (getEventPriority(domEventName)) {
    case 2:
      var listenerWrapper = dispatchDiscreteEvent;
      break;
    case 8:
      listenerWrapper = dispatchContinuousEvent;
      break;
    default:
      listenerWrapper = dispatchEvent;
  }
  eventSystemFlags = listenerWrapper.bind(
    null,
    domEventName,
    eventSystemFlags,
    targetContainer
  );
  listenerWrapper = void 0;
  !passiveBrowserEventsSupported || "touchstart" !== domEventName && "touchmove" !== domEventName && "wheel" !== domEventName || (listenerWrapper = true);
  isCapturePhaseListener ? void 0 !== listenerWrapper ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
    capture: true,
    passive: listenerWrapper
  }) : targetContainer.addEventListener(domEventName, eventSystemFlags, true) : void 0 !== listenerWrapper ? targetContainer.addEventListener(domEventName, eventSystemFlags, {
    passive: listenerWrapper
  }) : targetContainer.addEventListener(domEventName, eventSystemFlags, false);
}
function dispatchEventForPluginEventSystem(domEventName, eventSystemFlags, nativeEvent, targetInst$jscomp$0, targetContainer) {
  var ancestorInst = targetInst$jscomp$0;
  if (0 === (eventSystemFlags & 1) && 0 === (eventSystemFlags & 2) && null !== targetInst$jscomp$0)
    a: for (; ; ) {
      if (null === targetInst$jscomp$0) return;
      var nodeTag = targetInst$jscomp$0.tag;
      if (3 === nodeTag || 4 === nodeTag) {
        var container = targetInst$jscomp$0.stateNode.containerInfo;
        if (container === targetContainer || 8 === container.nodeType && container.parentNode === targetContainer)
          break;
        if (4 === nodeTag)
          for (nodeTag = targetInst$jscomp$0.return; null !== nodeTag; ) {
            var grandTag = nodeTag.tag;
            if (3 === grandTag || 4 === grandTag) {
              if (grandTag = nodeTag.stateNode.containerInfo, grandTag === targetContainer || 8 === grandTag.nodeType && grandTag.parentNode === targetContainer)
                return;
            }
            nodeTag = nodeTag.return;
          }
        for (; null !== container; ) {
          nodeTag = getClosestInstanceFromNode(container);
          if (null === nodeTag) return;
          grandTag = nodeTag.tag;
          if (5 === grandTag || 6 === grandTag || 26 === grandTag || 27 === grandTag) {
            targetInst$jscomp$0 = ancestorInst = nodeTag;
            continue a;
          }
          container = container.parentNode;
        }
      }
      targetInst$jscomp$0 = targetInst$jscomp$0.return;
    }
  batchedUpdates$1(function() {
    var targetInst = ancestorInst, nativeEventTarget = getEventTarget(nativeEvent), dispatchQueue = [];
    a: {
      var reactName = topLevelEventsToReactNames.get(domEventName);
      if (void 0 !== reactName) {
        var SyntheticEventCtor = SyntheticEvent, reactEventType = domEventName;
        switch (domEventName) {
          case "keypress":
            if (0 === getEventCharCode(nativeEvent)) break a;
          case "keydown":
          case "keyup":
            SyntheticEventCtor = SyntheticKeyboardEvent;
            break;
          case "focusin":
            reactEventType = "focus";
            SyntheticEventCtor = SyntheticFocusEvent;
            break;
          case "focusout":
            reactEventType = "blur";
            SyntheticEventCtor = SyntheticFocusEvent;
            break;
          case "beforeblur":
          case "afterblur":
            SyntheticEventCtor = SyntheticFocusEvent;
            break;
          case "click":
            if (2 === nativeEvent.button) break a;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            SyntheticEventCtor = SyntheticMouseEvent;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            SyntheticEventCtor = SyntheticDragEvent;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            SyntheticEventCtor = SyntheticTouchEvent;
            break;
          case ANIMATION_END:
          case ANIMATION_ITERATION:
          case ANIMATION_START:
            SyntheticEventCtor = SyntheticAnimationEvent;
            break;
          case TRANSITION_END:
            SyntheticEventCtor = SyntheticTransitionEvent;
            break;
          case "scroll":
          case "scrollend":
            SyntheticEventCtor = SyntheticUIEvent;
            break;
          case "wheel":
            SyntheticEventCtor = SyntheticWheelEvent;
            break;
          case "copy":
          case "cut":
          case "paste":
            SyntheticEventCtor = SyntheticClipboardEvent;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            SyntheticEventCtor = SyntheticPointerEvent;
            break;
          case "toggle":
          case "beforetoggle":
            SyntheticEventCtor = SyntheticToggleEvent;
        }
        var inCapturePhase = 0 !== (eventSystemFlags & 4), accumulateTargetOnly = !inCapturePhase && ("scroll" === domEventName || "scrollend" === domEventName), reactEventName = inCapturePhase ? null !== reactName ? reactName + "Capture" : null : reactName;
        inCapturePhase = [];
        for (var instance = targetInst, lastHostComponent; null !== instance; ) {
          var _instance = instance;
          lastHostComponent = _instance.stateNode;
          _instance = _instance.tag;
          5 !== _instance && 26 !== _instance && 27 !== _instance || null === lastHostComponent || null === reactEventName || (_instance = getListener(instance, reactEventName), null != _instance && inCapturePhase.push(
            createDispatchListener(instance, _instance, lastHostComponent)
          ));
          if (accumulateTargetOnly) break;
          instance = instance.return;
        }
        0 < inCapturePhase.length && (reactName = new SyntheticEventCtor(
          reactName,
          reactEventType,
          null,
          nativeEvent,
          nativeEventTarget
        ), dispatchQueue.push({ event: reactName, listeners: inCapturePhase }));
      }
    }
    if (0 === (eventSystemFlags & 7)) {
      a: {
        reactName = "mouseover" === domEventName || "pointerover" === domEventName;
        SyntheticEventCtor = "mouseout" === domEventName || "pointerout" === domEventName;
        if (reactName && nativeEvent !== currentReplayingEvent && (reactEventType = nativeEvent.relatedTarget || nativeEvent.fromElement) && (getClosestInstanceFromNode(reactEventType) || reactEventType[internalContainerInstanceKey]))
          break a;
        if (SyntheticEventCtor || reactName) {
          reactName = nativeEventTarget.window === nativeEventTarget ? nativeEventTarget : (reactName = nativeEventTarget.ownerDocument) ? reactName.defaultView || reactName.parentWindow : window;
          if (SyntheticEventCtor) {
            if (reactEventType = nativeEvent.relatedTarget || nativeEvent.toElement, SyntheticEventCtor = targetInst, reactEventType = reactEventType ? getClosestInstanceFromNode(reactEventType) : null, null !== reactEventType && (accumulateTargetOnly = getNearestMountedFiber(reactEventType), inCapturePhase = reactEventType.tag, reactEventType !== accumulateTargetOnly || 5 !== inCapturePhase && 27 !== inCapturePhase && 6 !== inCapturePhase))
              reactEventType = null;
          } else SyntheticEventCtor = null, reactEventType = targetInst;
          if (SyntheticEventCtor !== reactEventType) {
            inCapturePhase = SyntheticMouseEvent;
            _instance = "onMouseLeave";
            reactEventName = "onMouseEnter";
            instance = "mouse";
            if ("pointerout" === domEventName || "pointerover" === domEventName)
              inCapturePhase = SyntheticPointerEvent, _instance = "onPointerLeave", reactEventName = "onPointerEnter", instance = "pointer";
            accumulateTargetOnly = null == SyntheticEventCtor ? reactName : getNodeFromInstance(SyntheticEventCtor);
            lastHostComponent = null == reactEventType ? reactName : getNodeFromInstance(reactEventType);
            reactName = new inCapturePhase(
              _instance,
              instance + "leave",
              SyntheticEventCtor,
              nativeEvent,
              nativeEventTarget
            );
            reactName.target = accumulateTargetOnly;
            reactName.relatedTarget = lastHostComponent;
            _instance = null;
            getClosestInstanceFromNode(nativeEventTarget) === targetInst && (inCapturePhase = new inCapturePhase(
              reactEventName,
              instance + "enter",
              reactEventType,
              nativeEvent,
              nativeEventTarget
            ), inCapturePhase.target = lastHostComponent, inCapturePhase.relatedTarget = accumulateTargetOnly, _instance = inCapturePhase);
            accumulateTargetOnly = _instance;
            if (SyntheticEventCtor && reactEventType)
              b: {
                inCapturePhase = SyntheticEventCtor;
                reactEventName = reactEventType;
                instance = 0;
                for (lastHostComponent = inCapturePhase; lastHostComponent; lastHostComponent = getParent(lastHostComponent))
                  instance++;
                lastHostComponent = 0;
                for (_instance = reactEventName; _instance; _instance = getParent(_instance))
                  lastHostComponent++;
                for (; 0 < instance - lastHostComponent; )
                  inCapturePhase = getParent(inCapturePhase), instance--;
                for (; 0 < lastHostComponent - instance; )
                  reactEventName = getParent(reactEventName), lastHostComponent--;
                for (; instance--; ) {
                  if (inCapturePhase === reactEventName || null !== reactEventName && inCapturePhase === reactEventName.alternate)
                    break b;
                  inCapturePhase = getParent(inCapturePhase);
                  reactEventName = getParent(reactEventName);
                }
                inCapturePhase = null;
              }
            else inCapturePhase = null;
            null !== SyntheticEventCtor && accumulateEnterLeaveListenersForEvent(
              dispatchQueue,
              reactName,
              SyntheticEventCtor,
              inCapturePhase,
              false
            );
            null !== reactEventType && null !== accumulateTargetOnly && accumulateEnterLeaveListenersForEvent(
              dispatchQueue,
              accumulateTargetOnly,
              reactEventType,
              inCapturePhase,
              true
            );
          }
        }
      }
      a: {
        reactName = targetInst ? getNodeFromInstance(targetInst) : window;
        SyntheticEventCtor = reactName.nodeName && reactName.nodeName.toLowerCase();
        if ("select" === SyntheticEventCtor || "input" === SyntheticEventCtor && "file" === reactName.type)
          var getTargetInstFunc = getTargetInstForChangeEvent;
        else if (isTextInputElement(reactName))
          if (isInputEventSupported)
            getTargetInstFunc = getTargetInstForInputOrChangeEvent;
          else {
            getTargetInstFunc = getTargetInstForInputEventPolyfill;
            var handleEventFunc = handleEventsForInputEventPolyfill;
          }
        else
          SyntheticEventCtor = reactName.nodeName, !SyntheticEventCtor || "input" !== SyntheticEventCtor.toLowerCase() || "checkbox" !== reactName.type && "radio" !== reactName.type ? targetInst && isCustomElement(targetInst.elementType) && (getTargetInstFunc = getTargetInstForChangeEvent) : getTargetInstFunc = getTargetInstForClickEvent;
        if (getTargetInstFunc && (getTargetInstFunc = getTargetInstFunc(domEventName, targetInst))) {
          createAndAccumulateChangeEvent(
            dispatchQueue,
            getTargetInstFunc,
            nativeEvent,
            nativeEventTarget
          );
          break a;
        }
        handleEventFunc && handleEventFunc(domEventName, reactName, targetInst);
        "focusout" === domEventName && targetInst && "number" === reactName.type && null != targetInst.memoizedProps.value && setDefaultValue(reactName, "number", reactName.value);
      }
      handleEventFunc = targetInst ? getNodeFromInstance(targetInst) : window;
      switch (domEventName) {
        case "focusin":
          if (isTextInputElement(handleEventFunc) || "true" === handleEventFunc.contentEditable)
            activeElement = handleEventFunc, activeElementInst = targetInst, lastSelection = null;
          break;
        case "focusout":
          lastSelection = activeElementInst = activeElement = null;
          break;
        case "mousedown":
          mouseDown = true;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          mouseDown = false;
          constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
          break;
        case "selectionchange":
          if (skipSelectionChangeEvent) break;
        case "keydown":
        case "keyup":
          constructSelectEvent(dispatchQueue, nativeEvent, nativeEventTarget);
      }
      var fallbackData;
      if (canUseCompositionEvent)
        b: {
          switch (domEventName) {
            case "compositionstart":
              var eventType = "onCompositionStart";
              break b;
            case "compositionend":
              eventType = "onCompositionEnd";
              break b;
            case "compositionupdate":
              eventType = "onCompositionUpdate";
              break b;
          }
          eventType = void 0;
        }
      else
        isComposing ? isFallbackCompositionEnd(domEventName, nativeEvent) && (eventType = "onCompositionEnd") : "keydown" === domEventName && 229 === nativeEvent.keyCode && (eventType = "onCompositionStart");
      eventType && (useFallbackCompositionData && "ko" !== nativeEvent.locale && (isComposing || "onCompositionStart" !== eventType ? "onCompositionEnd" === eventType && isComposing && (fallbackData = getData()) : (root = nativeEventTarget, startText = "value" in root ? root.value : root.textContent, isComposing = true)), handleEventFunc = accumulateTwoPhaseListeners(targetInst, eventType), 0 < handleEventFunc.length && (eventType = new SyntheticCompositionEvent(
        eventType,
        domEventName,
        null,
        nativeEvent,
        nativeEventTarget
      ), dispatchQueue.push({ event: eventType, listeners: handleEventFunc }), fallbackData ? eventType.data = fallbackData : (fallbackData = getDataFromCustomEvent(nativeEvent), null !== fallbackData && (eventType.data = fallbackData))));
      if (fallbackData = canUseTextInputEvent ? getNativeBeforeInputChars(domEventName, nativeEvent) : getFallbackBeforeInputChars(domEventName, nativeEvent))
        eventType = accumulateTwoPhaseListeners(targetInst, "onBeforeInput"), 0 < eventType.length && (handleEventFunc = new SyntheticCompositionEvent(
          "onBeforeInput",
          "beforeinput",
          null,
          nativeEvent,
          nativeEventTarget
        ), dispatchQueue.push({
          event: handleEventFunc,
          listeners: eventType
        }), handleEventFunc.data = fallbackData);
      extractEvents$1(
        dispatchQueue,
        domEventName,
        targetInst,
        nativeEvent,
        nativeEventTarget
      );
    }
    processDispatchQueue(dispatchQueue, eventSystemFlags);
  });
}
function createDispatchListener(instance, listener, currentTarget) {
  return {
    instance,
    listener,
    currentTarget
  };
}
function accumulateTwoPhaseListeners(targetFiber, reactName) {
  for (var captureName = reactName + "Capture", listeners = []; null !== targetFiber; ) {
    var _instance2 = targetFiber, stateNode = _instance2.stateNode;
    _instance2 = _instance2.tag;
    5 !== _instance2 && 26 !== _instance2 && 27 !== _instance2 || null === stateNode || (_instance2 = getListener(targetFiber, captureName), null != _instance2 && listeners.unshift(
      createDispatchListener(targetFiber, _instance2, stateNode)
    ), _instance2 = getListener(targetFiber, reactName), null != _instance2 && listeners.push(
      createDispatchListener(targetFiber, _instance2, stateNode)
    ));
    targetFiber = targetFiber.return;
  }
  return listeners;
}
function getParent(inst) {
  if (null === inst) return null;
  do
    inst = inst.return;
  while (inst && 5 !== inst.tag && 27 !== inst.tag);
  return inst ? inst : null;
}
function accumulateEnterLeaveListenersForEvent(dispatchQueue, event, target, common, inCapturePhase) {
  for (var registrationName = event._reactName, listeners = []; null !== target && target !== common; ) {
    var _instance3 = target, alternate = _instance3.alternate, stateNode = _instance3.stateNode;
    _instance3 = _instance3.tag;
    if (null !== alternate && alternate === common) break;
    5 !== _instance3 && 26 !== _instance3 && 27 !== _instance3 || null === stateNode || (alternate = stateNode, inCapturePhase ? (stateNode = getListener(target, registrationName), null != stateNode && listeners.unshift(
      createDispatchListener(target, stateNode, alternate)
    )) : inCapturePhase || (stateNode = getListener(target, registrationName), null != stateNode && listeners.push(
      createDispatchListener(target, stateNode, alternate)
    )));
    target = target.return;
  }
  0 !== listeners.length && dispatchQueue.push({ event, listeners });
}
var NORMALIZE_NEWLINES_REGEX = /\r\n?/g, NORMALIZE_NULL_AND_REPLACEMENT_REGEX = /\u0000|\uFFFD/g;
function normalizeMarkupForTextOrAttribute(markup) {
  return ("string" === typeof markup ? markup : "" + markup).replace(NORMALIZE_NEWLINES_REGEX, "\n").replace(NORMALIZE_NULL_AND_REPLACEMENT_REGEX, "");
}
function checkForUnmatchedText(serverText, clientText) {
  clientText = normalizeMarkupForTextOrAttribute(clientText);
  return normalizeMarkupForTextOrAttribute(serverText) === clientText ? true : false;
}
function noop$1() {
}
function setProp(domElement, tag, key, value, props, prevValue) {
  switch (key) {
    case "children":
      "string" === typeof value ? "body" === tag || "textarea" === tag && "" === value || setTextContent(domElement, value) : ("number" === typeof value || "bigint" === typeof value) && "body" !== tag && setTextContent(domElement, "" + value);
      break;
    case "className":
      setValueForKnownAttribute(domElement, "class", value);
      break;
    case "tabIndex":
      setValueForKnownAttribute(domElement, "tabindex", value);
      break;
    case "dir":
    case "role":
    case "viewBox":
    case "width":
    case "height":
      setValueForKnownAttribute(domElement, key, value);
      break;
    case "style":
      setValueForStyles(domElement, value, prevValue);
      break;
    case "data":
      if ("object" !== tag) {
        setValueForKnownAttribute(domElement, "data", value);
        break;
      }
    case "src":
    case "href":
      if ("" === value && ("a" !== tag || "href" !== key)) {
        domElement.removeAttribute(key);
        break;
      }
      if (null == value || "function" === typeof value || "symbol" === typeof value || "boolean" === typeof value) {
        domElement.removeAttribute(key);
        break;
      }
      value = sanitizeURL("" + value);
      domElement.setAttribute(key, value);
      break;
    case "action":
    case "formAction":
      if ("function" === typeof value) {
        domElement.setAttribute(
          key,
          "javascript:throw new Error('A React form was unexpectedly submitted. If you called form.submit() manually, consider using form.requestSubmit() instead. If you\\'re trying to use event.stopPropagation() in a submit event handler, consider also calling event.preventDefault().')"
        );
        break;
      } else
        "function" === typeof prevValue && ("formAction" === key ? ("input" !== tag && setProp(domElement, tag, "name", props.name, props, null), setProp(
          domElement,
          tag,
          "formEncType",
          props.formEncType,
          props,
          null
        ), setProp(
          domElement,
          tag,
          "formMethod",
          props.formMethod,
          props,
          null
        ), setProp(
          domElement,
          tag,
          "formTarget",
          props.formTarget,
          props,
          null
        )) : (setProp(domElement, tag, "encType", props.encType, props, null), setProp(domElement, tag, "method", props.method, props, null), setProp(domElement, tag, "target", props.target, props, null)));
      if (null == value || "symbol" === typeof value || "boolean" === typeof value) {
        domElement.removeAttribute(key);
        break;
      }
      value = sanitizeURL("" + value);
      domElement.setAttribute(key, value);
      break;
    case "onClick":
      null != value && (domElement.onclick = noop$1);
      break;
    case "onScroll":
      null != value && listenToNonDelegatedEvent("scroll", domElement);
      break;
    case "onScrollEnd":
      null != value && listenToNonDelegatedEvent("scrollend", domElement);
      break;
    case "dangerouslySetInnerHTML":
      if (null != value) {
        if ("object" !== typeof value || !("__html" in value))
          throw Error(formatProdErrorMessage(61));
        key = value.__html;
        if (null != key) {
          if (null != props.children) throw Error(formatProdErrorMessage(60));
          domElement.innerHTML = key;
        }
      }
      break;
    case "multiple":
      domElement.multiple = value && "function" !== typeof value && "symbol" !== typeof value;
      break;
    case "muted":
      domElement.muted = value && "function" !== typeof value && "symbol" !== typeof value;
      break;
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "defaultValue":
    case "defaultChecked":
    case "innerHTML":
    case "ref":
      break;
    case "autoFocus":
      break;
    case "xlinkHref":
      if (null == value || "function" === typeof value || "boolean" === typeof value || "symbol" === typeof value) {
        domElement.removeAttribute("xlink:href");
        break;
      }
      key = sanitizeURL("" + value);
      domElement.setAttributeNS(
        "http://www.w3.org/1999/xlink",
        "xlink:href",
        key
      );
      break;
    case "contentEditable":
    case "spellCheck":
    case "draggable":
    case "value":
    case "autoReverse":
    case "externalResourcesRequired":
    case "focusable":
    case "preserveAlpha":
      null != value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, "" + value) : domElement.removeAttribute(key);
      break;
    case "inert":
    case "allowFullScreen":
    case "async":
    case "autoPlay":
    case "controls":
    case "default":
    case "defer":
    case "disabled":
    case "disablePictureInPicture":
    case "disableRemotePlayback":
    case "formNoValidate":
    case "hidden":
    case "loop":
    case "noModule":
    case "noValidate":
    case "open":
    case "playsInline":
    case "readOnly":
    case "required":
    case "reversed":
    case "scoped":
    case "seamless":
    case "itemScope":
      value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, "") : domElement.removeAttribute(key);
      break;
    case "capture":
    case "download":
      true === value ? domElement.setAttribute(key, "") : false !== value && null != value && "function" !== typeof value && "symbol" !== typeof value ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
      break;
    case "cols":
    case "rows":
    case "size":
    case "span":
      null != value && "function" !== typeof value && "symbol" !== typeof value && !isNaN(value) && 1 <= value ? domElement.setAttribute(key, value) : domElement.removeAttribute(key);
      break;
    case "rowSpan":
    case "start":
      null == value || "function" === typeof value || "symbol" === typeof value || isNaN(value) ? domElement.removeAttribute(key) : domElement.setAttribute(key, value);
      break;
    case "popover":
      listenToNonDelegatedEvent("beforetoggle", domElement);
      listenToNonDelegatedEvent("toggle", domElement);
      setValueForAttribute(domElement, "popover", value);
      break;
    case "xlinkActuate":
      setValueForNamespacedAttribute(
        domElement,
        "http://www.w3.org/1999/xlink",
        "xlink:actuate",
        value
      );
      break;
    case "xlinkArcrole":
      setValueForNamespacedAttribute(
        domElement,
        "http://www.w3.org/1999/xlink",
        "xlink:arcrole",
        value
      );
      break;
    case "xlinkRole":
      setValueForNamespacedAttribute(
        domElement,
        "http://www.w3.org/1999/xlink",
        "xlink:role",
        value
      );
      break;
    case "xlinkShow":
      setValueForNamespacedAttribute(
        domElement,
        "http://www.w3.org/1999/xlink",
        "xlink:show",
        value
      );
      break;
    case "xlinkTitle":
      setValueForNamespacedAttribute(
        domElement,
        "http://www.w3.org/1999/xlink",
        "xlink:title",
        value
      );
      break;
    case "xlinkType":
      setValueForNamespacedAttribute(
        domElement,
        "http://www.w3.org/1999/xlink",
        "xlink:type",
        value
      );
      break;
    case "xmlBase":
      setValueForNamespacedAttribute(
        domElement,
        "http://www.w3.org/XML/1998/namespace",
        "xml:base",
        value
      );
      break;
    case "xmlLang":
      setValueForNamespacedAttribute(
        domElement,
        "http://www.w3.org/XML/1998/namespace",
        "xml:lang",
        value
      );
      break;
    case "xmlSpace":
      setValueForNamespacedAttribute(
        domElement,
        "http://www.w3.org/XML/1998/namespace",
        "xml:space",
        value
      );
      break;
    case "is":
      setValueForAttribute(domElement, "is", value);
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      if (!(2 < key.length) || "o" !== key[0] && "O" !== key[0] || "n" !== key[1] && "N" !== key[1])
        key = aliases.get(key) || key, setValueForAttribute(domElement, key, value);
  }
}
function setPropOnCustomElement(domElement, tag, key, value, props, prevValue) {
  switch (key) {
    case "style":
      setValueForStyles(domElement, value, prevValue);
      break;
    case "dangerouslySetInnerHTML":
      if (null != value) {
        if ("object" !== typeof value || !("__html" in value))
          throw Error(formatProdErrorMessage(61));
        key = value.__html;
        if (null != key) {
          if (null != props.children) throw Error(formatProdErrorMessage(60));
          domElement.innerHTML = key;
        }
      }
      break;
    case "children":
      "string" === typeof value ? setTextContent(domElement, value) : ("number" === typeof value || "bigint" === typeof value) && setTextContent(domElement, "" + value);
      break;
    case "onScroll":
      null != value && listenToNonDelegatedEvent("scroll", domElement);
      break;
    case "onScrollEnd":
      null != value && listenToNonDelegatedEvent("scrollend", domElement);
      break;
    case "onClick":
      null != value && (domElement.onclick = noop$1);
      break;
    case "suppressContentEditableWarning":
    case "suppressHydrationWarning":
    case "innerHTML":
    case "ref":
      break;
    case "innerText":
    case "textContent":
      break;
    default:
      if (!registrationNameDependencies.hasOwnProperty(key))
        a: {
          if ("o" === key[0] && "n" === key[1] && (props = key.endsWith("Capture"), tag = key.slice(2, props ? key.length - 7 : void 0), prevValue = domElement[internalPropsKey] || null, prevValue = null != prevValue ? prevValue[key] : null, "function" === typeof prevValue && domElement.removeEventListener(tag, prevValue, props), "function" === typeof value)) {
            "function" !== typeof prevValue && null !== prevValue && (key in domElement ? domElement[key] = null : domElement.hasAttribute(key) && domElement.removeAttribute(key));
            domElement.addEventListener(tag, value, props);
            break a;
          }
          key in domElement ? domElement[key] = value : true === value ? domElement.setAttribute(key, "") : setValueForAttribute(domElement, key, value);
        }
  }
}
function setInitialProperties(domElement, tag, props) {
  switch (tag) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "a":
    case "g":
    case "p":
    case "li":
      break;
    case "img":
      listenToNonDelegatedEvent("error", domElement);
      listenToNonDelegatedEvent("load", domElement);
      var hasSrc = false, hasSrcSet = false, propKey;
      for (propKey in props)
        if (props.hasOwnProperty(propKey)) {
          var propValue = props[propKey];
          if (null != propValue)
            switch (propKey) {
              case "src":
                hasSrc = true;
                break;
              case "srcSet":
                hasSrcSet = true;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                throw Error(formatProdErrorMessage(137, tag));
              default:
                setProp(domElement, tag, propKey, propValue, props, null);
            }
        }
      hasSrcSet && setProp(domElement, tag, "srcSet", props.srcSet, props, null);
      hasSrc && setProp(domElement, tag, "src", props.src, props, null);
      return;
    case "input":
      listenToNonDelegatedEvent("invalid", domElement);
      var defaultValue = propKey = propValue = hasSrcSet = null, checked = null, defaultChecked = null;
      for (hasSrc in props)
        if (props.hasOwnProperty(hasSrc)) {
          var propValue$186 = props[hasSrc];
          if (null != propValue$186)
            switch (hasSrc) {
              case "name":
                hasSrcSet = propValue$186;
                break;
              case "type":
                propValue = propValue$186;
                break;
              case "checked":
                checked = propValue$186;
                break;
              case "defaultChecked":
                defaultChecked = propValue$186;
                break;
              case "value":
                propKey = propValue$186;
                break;
              case "defaultValue":
                defaultValue = propValue$186;
                break;
              case "children":
              case "dangerouslySetInnerHTML":
                if (null != propValue$186)
                  throw Error(formatProdErrorMessage(137, tag));
                break;
              default:
                setProp(domElement, tag, hasSrc, propValue$186, props, null);
            }
        }
      initInput(
        domElement,
        propKey,
        defaultValue,
        checked,
        defaultChecked,
        propValue,
        hasSrcSet,
        false
      );
      track(domElement);
      return;
    case "select":
      listenToNonDelegatedEvent("invalid", domElement);
      hasSrc = propValue = propKey = null;
      for (hasSrcSet in props)
        if (props.hasOwnProperty(hasSrcSet) && (defaultValue = props[hasSrcSet], null != defaultValue))
          switch (hasSrcSet) {
            case "value":
              propKey = defaultValue;
              break;
            case "defaultValue":
              propValue = defaultValue;
              break;
            case "multiple":
              hasSrc = defaultValue;
            default:
              setProp(domElement, tag, hasSrcSet, defaultValue, props, null);
          }
      tag = propKey;
      props = propValue;
      domElement.multiple = !!hasSrc;
      null != tag ? updateOptions(domElement, !!hasSrc, tag, false) : null != props && updateOptions(domElement, !!hasSrc, props, true);
      return;
    case "textarea":
      listenToNonDelegatedEvent("invalid", domElement);
      propKey = hasSrcSet = hasSrc = null;
      for (propValue in props)
        if (props.hasOwnProperty(propValue) && (defaultValue = props[propValue], null != defaultValue))
          switch (propValue) {
            case "value":
              hasSrc = defaultValue;
              break;
            case "defaultValue":
              hasSrcSet = defaultValue;
              break;
            case "children":
              propKey = defaultValue;
              break;
            case "dangerouslySetInnerHTML":
              if (null != defaultValue) throw Error(formatProdErrorMessage(91));
              break;
            default:
              setProp(domElement, tag, propValue, defaultValue, props, null);
          }
      initTextarea(domElement, hasSrc, hasSrcSet, propKey);
      track(domElement);
      return;
    case "option":
      for (checked in props)
        if (props.hasOwnProperty(checked) && (hasSrc = props[checked], null != hasSrc))
          switch (checked) {
            case "selected":
              domElement.selected = hasSrc && "function" !== typeof hasSrc && "symbol" !== typeof hasSrc;
              break;
            default:
              setProp(domElement, tag, checked, hasSrc, props, null);
          }
      return;
    case "dialog":
      listenToNonDelegatedEvent("cancel", domElement);
      listenToNonDelegatedEvent("close", domElement);
      break;
    case "iframe":
    case "object":
      listenToNonDelegatedEvent("load", domElement);
      break;
    case "video":
    case "audio":
      for (hasSrc = 0; hasSrc < mediaEventTypes.length; hasSrc++)
        listenToNonDelegatedEvent(mediaEventTypes[hasSrc], domElement);
      break;
    case "image":
      listenToNonDelegatedEvent("error", domElement);
      listenToNonDelegatedEvent("load", domElement);
      break;
    case "details":
      listenToNonDelegatedEvent("toggle", domElement);
      break;
    case "embed":
    case "source":
    case "link":
      listenToNonDelegatedEvent("error", domElement), listenToNonDelegatedEvent("load", domElement);
    case "area":
    case "base":
    case "br":
    case "col":
    case "hr":
    case "keygen":
    case "meta":
    case "param":
    case "track":
    case "wbr":
    case "menuitem":
      for (defaultChecked in props)
        if (props.hasOwnProperty(defaultChecked) && (hasSrc = props[defaultChecked], null != hasSrc))
          switch (defaultChecked) {
            case "children":
            case "dangerouslySetInnerHTML":
              throw Error(formatProdErrorMessage(137, tag));
            default:
              setProp(domElement, tag, defaultChecked, hasSrc, props, null);
          }
      return;
    default:
      if (isCustomElement(tag)) {
        for (propValue$186 in props)
          props.hasOwnProperty(propValue$186) && (hasSrc = props[propValue$186], void 0 !== hasSrc && setPropOnCustomElement(
            domElement,
            tag,
            propValue$186,
            hasSrc,
            props,
            void 0
          ));
        return;
      }
  }
  for (defaultValue in props)
    props.hasOwnProperty(defaultValue) && (hasSrc = props[defaultValue], null != hasSrc && setProp(domElement, tag, defaultValue, hasSrc, props, null));
}
function updateProperties(domElement, tag, lastProps, nextProps) {
  switch (tag) {
    case "div":
    case "span":
    case "svg":
    case "path":
    case "a":
    case "g":
    case "p":
    case "li":
      break;
    case "input":
      var name = null, type = null, value = null, defaultValue = null, lastDefaultValue = null, checked = null, defaultChecked = null;
      for (propKey in lastProps) {
        var lastProp = lastProps[propKey];
        if (lastProps.hasOwnProperty(propKey) && null != lastProp)
          switch (propKey) {
            case "checked":
              break;
            case "value":
              break;
            case "defaultValue":
              lastDefaultValue = lastProp;
            default:
              nextProps.hasOwnProperty(propKey) || setProp(domElement, tag, propKey, null, nextProps, lastProp);
          }
      }
      for (var propKey$203 in nextProps) {
        var propKey = nextProps[propKey$203];
        lastProp = lastProps[propKey$203];
        if (nextProps.hasOwnProperty(propKey$203) && (null != propKey || null != lastProp))
          switch (propKey$203) {
            case "type":
              type = propKey;
              break;
            case "name":
              name = propKey;
              break;
            case "checked":
              checked = propKey;
              break;
            case "defaultChecked":
              defaultChecked = propKey;
              break;
            case "value":
              value = propKey;
              break;
            case "defaultValue":
              defaultValue = propKey;
              break;
            case "children":
            case "dangerouslySetInnerHTML":
              if (null != propKey)
                throw Error(formatProdErrorMessage(137, tag));
              break;
            default:
              propKey !== lastProp && setProp(
                domElement,
                tag,
                propKey$203,
                propKey,
                nextProps,
                lastProp
              );
          }
      }
      updateInput(
        domElement,
        value,
        defaultValue,
        lastDefaultValue,
        checked,
        defaultChecked,
        type,
        name
      );
      return;
    case "select":
      propKey = value = defaultValue = propKey$203 = null;
      for (type in lastProps)
        if (lastDefaultValue = lastProps[type], lastProps.hasOwnProperty(type) && null != lastDefaultValue)
          switch (type) {
            case "value":
              break;
            case "multiple":
              propKey = lastDefaultValue;
            default:
              nextProps.hasOwnProperty(type) || setProp(
                domElement,
                tag,
                type,
                null,
                nextProps,
                lastDefaultValue
              );
          }
      for (name in nextProps)
        if (type = nextProps[name], lastDefaultValue = lastProps[name], nextProps.hasOwnProperty(name) && (null != type || null != lastDefaultValue))
          switch (name) {
            case "value":
              propKey$203 = type;
              break;
            case "defaultValue":
              defaultValue = type;
              break;
            case "multiple":
              value = type;
            default:
              type !== lastDefaultValue && setProp(
                domElement,
                tag,
                name,
                type,
                nextProps,
                lastDefaultValue
              );
          }
      tag = defaultValue;
      lastProps = value;
      nextProps = propKey;
      null != propKey$203 ? updateOptions(domElement, !!lastProps, propKey$203, false) : !!nextProps !== !!lastProps && (null != tag ? updateOptions(domElement, !!lastProps, tag, true) : updateOptions(domElement, !!lastProps, lastProps ? [] : "", false));
      return;
    case "textarea":
      propKey = propKey$203 = null;
      for (defaultValue in lastProps)
        if (name = lastProps[defaultValue], lastProps.hasOwnProperty(defaultValue) && null != name && !nextProps.hasOwnProperty(defaultValue))
          switch (defaultValue) {
            case "value":
              break;
            case "children":
              break;
            default:
              setProp(domElement, tag, defaultValue, null, nextProps, name);
          }
      for (value in nextProps)
        if (name = nextProps[value], type = lastProps[value], nextProps.hasOwnProperty(value) && (null != name || null != type))
          switch (value) {
            case "value":
              propKey$203 = name;
              break;
            case "defaultValue":
              propKey = name;
              break;
            case "children":
              break;
            case "dangerouslySetInnerHTML":
              if (null != name) throw Error(formatProdErrorMessage(91));
              break;
            default:
              name !== type && setProp(domElement, tag, value, name, nextProps, type);
          }
      updateTextarea(domElement, propKey$203, propKey);
      return;
    case "option":
      for (var propKey$219 in lastProps)
        if (propKey$203 = lastProps[propKey$219], lastProps.hasOwnProperty(propKey$219) && null != propKey$203 && !nextProps.hasOwnProperty(propKey$219))
          switch (propKey$219) {
            case "selected":
              domElement.selected = false;
              break;
            default:
              setProp(
                domElement,
                tag,
                propKey$219,
                null,
                nextProps,
                propKey$203
              );
          }
      for (lastDefaultValue in nextProps)
        if (propKey$203 = nextProps[lastDefaultValue], propKey = lastProps[lastDefaultValue], nextProps.hasOwnProperty(lastDefaultValue) && propKey$203 !== propKey && (null != propKey$203 || null != propKey))
          switch (lastDefaultValue) {
            case "selected":
              domElement.selected = propKey$203 && "function" !== typeof propKey$203 && "symbol" !== typeof propKey$203;
              break;
            default:
              setProp(
                domElement,
                tag,
                lastDefaultValue,
                propKey$203,
                nextProps,
                propKey
              );
          }
      return;
    case "img":
    case "link":
    case "area":
    case "base":
    case "br":
    case "col":
    case "embed":
    case "hr":
    case "keygen":
    case "meta":
    case "param":
    case "source":
    case "track":
    case "wbr":
    case "menuitem":
      for (var propKey$224 in lastProps)
        propKey$203 = lastProps[propKey$224], lastProps.hasOwnProperty(propKey$224) && null != propKey$203 && !nextProps.hasOwnProperty(propKey$224) && setProp(domElement, tag, propKey$224, null, nextProps, propKey$203);
      for (checked in nextProps)
        if (propKey$203 = nextProps[checked], propKey = lastProps[checked], nextProps.hasOwnProperty(checked) && propKey$203 !== propKey && (null != propKey$203 || null != propKey))
          switch (checked) {
            case "children":
            case "dangerouslySetInnerHTML":
              if (null != propKey$203)
                throw Error(formatProdErrorMessage(137, tag));
              break;
            default:
              setProp(
                domElement,
                tag,
                checked,
                propKey$203,
                nextProps,
                propKey
              );
          }
      return;
    default:
      if (isCustomElement(tag)) {
        for (var propKey$229 in lastProps)
          propKey$203 = lastProps[propKey$229], lastProps.hasOwnProperty(propKey$229) && void 0 !== propKey$203 && !nextProps.hasOwnProperty(propKey$229) && setPropOnCustomElement(
            domElement,
            tag,
            propKey$229,
            void 0,
            nextProps,
            propKey$203
          );
        for (defaultChecked in nextProps)
          propKey$203 = nextProps[defaultChecked], propKey = lastProps[defaultChecked], !nextProps.hasOwnProperty(defaultChecked) || propKey$203 === propKey || void 0 === propKey$203 && void 0 === propKey || setPropOnCustomElement(
            domElement,
            tag,
            defaultChecked,
            propKey$203,
            nextProps,
            propKey
          );
        return;
      }
  }
  for (var propKey$234 in lastProps)
    propKey$203 = lastProps[propKey$234], lastProps.hasOwnProperty(propKey$234) && null != propKey$203 && !nextProps.hasOwnProperty(propKey$234) && setProp(domElement, tag, propKey$234, null, nextProps, propKey$203);
  for (lastProp in nextProps)
    propKey$203 = nextProps[lastProp], propKey = lastProps[lastProp], !nextProps.hasOwnProperty(lastProp) || propKey$203 === propKey || null == propKey$203 && null == propKey || setProp(domElement, tag, lastProp, propKey$203, nextProps, propKey);
}
var eventsEnabled = null, selectionInformation = null;
function getOwnerDocumentFromRootContainer(rootContainerElement) {
  return 9 === rootContainerElement.nodeType ? rootContainerElement : rootContainerElement.ownerDocument;
}
function getOwnHostContext(namespaceURI) {
  switch (namespaceURI) {
    case "http://www.w3.org/2000/svg":
      return 1;
    case "http://www.w3.org/1998/Math/MathML":
      return 2;
    default:
      return 0;
  }
}
function getChildHostContextProd(parentNamespace, type) {
  if (0 === parentNamespace)
    switch (type) {
      case "svg":
        return 1;
      case "math":
        return 2;
      default:
        return 0;
    }
  return 1 === parentNamespace && "foreignObject" === type ? 0 : parentNamespace;
}
function shouldSetTextContent(type, props) {
  return "textarea" === type || "noscript" === type || "string" === typeof props.children || "number" === typeof props.children || "bigint" === typeof props.children || "object" === typeof props.dangerouslySetInnerHTML && null !== props.dangerouslySetInnerHTML && null != props.dangerouslySetInnerHTML.__html;
}
var currentPopstateTransitionEvent = null;
function shouldAttemptEagerTransition() {
  var event = window.event;
  if (event && "popstate" === event.type) {
    if (event === currentPopstateTransitionEvent) return false;
    currentPopstateTransitionEvent = event;
    return true;
  }
  currentPopstateTransitionEvent = null;
  return false;
}
var scheduleTimeout = "function" === typeof setTimeout ? setTimeout : void 0, cancelTimeout = "function" === typeof clearTimeout ? clearTimeout : void 0, localPromise = "function" === typeof Promise ? Promise : void 0, scheduleMicrotask = "function" === typeof queueMicrotask ? queueMicrotask : "undefined" !== typeof localPromise ? function(callback) {
  return localPromise.resolve(null).then(callback).catch(handleErrorInNextTick);
} : scheduleTimeout;
function handleErrorInNextTick(error) {
  setTimeout(function() {
    throw error;
  });
}
function clearSuspenseBoundary(parentInstance, suspenseInstance) {
  var node = suspenseInstance, depth = 0;
  do {
    var nextNode = node.nextSibling;
    parentInstance.removeChild(node);
    if (nextNode && 8 === nextNode.nodeType)
      if (node = nextNode.data, "/$" === node) {
        if (0 === depth) {
          parentInstance.removeChild(nextNode);
          retryIfBlockedOn(suspenseInstance);
          return;
        }
        depth--;
      } else "$" !== node && "$?" !== node && "$!" !== node || depth++;
    node = nextNode;
  } while (node);
  retryIfBlockedOn(suspenseInstance);
}
function clearContainerSparingly(container) {
  var nextNode = container.firstChild;
  nextNode && 10 === nextNode.nodeType && (nextNode = nextNode.nextSibling);
  for (; nextNode; ) {
    var node = nextNode;
    nextNode = nextNode.nextSibling;
    switch (node.nodeName) {
      case "HTML":
      case "HEAD":
      case "BODY":
        clearContainerSparingly(node);
        detachDeletedInstance(node);
        continue;
      case "SCRIPT":
      case "STYLE":
        continue;
      case "LINK":
        if ("stylesheet" === node.rel.toLowerCase()) continue;
    }
    container.removeChild(node);
  }
}
function canHydrateInstance(instance, type, props, inRootOrSingleton) {
  for (; 1 === instance.nodeType; ) {
    var anyProps = props;
    if (instance.nodeName.toLowerCase() !== type.toLowerCase()) {
      if (!inRootOrSingleton && ("INPUT" !== instance.nodeName || "hidden" !== instance.type))
        break;
    } else if (!inRootOrSingleton)
      if ("input" === type && "hidden" === instance.type) {
        var name = null == anyProps.name ? null : "" + anyProps.name;
        if ("hidden" === anyProps.type && instance.getAttribute("name") === name)
          return instance;
      } else return instance;
    else if (!instance[internalHoistableMarker])
      switch (type) {
        case "meta":
          if (!instance.hasAttribute("itemprop")) break;
          return instance;
        case "link":
          name = instance.getAttribute("rel");
          if ("stylesheet" === name && instance.hasAttribute("data-precedence"))
            break;
          else if (name !== anyProps.rel || instance.getAttribute("href") !== (null == anyProps.href ? null : anyProps.href) || instance.getAttribute("crossorigin") !== (null == anyProps.crossOrigin ? null : anyProps.crossOrigin) || instance.getAttribute("title") !== (null == anyProps.title ? null : anyProps.title))
            break;
          return instance;
        case "style":
          if (instance.hasAttribute("data-precedence")) break;
          return instance;
        case "script":
          name = instance.getAttribute("src");
          if ((name !== (null == anyProps.src ? null : anyProps.src) || instance.getAttribute("type") !== (null == anyProps.type ? null : anyProps.type) || instance.getAttribute("crossorigin") !== (null == anyProps.crossOrigin ? null : anyProps.crossOrigin)) && name && instance.hasAttribute("async") && !instance.hasAttribute("itemprop"))
            break;
          return instance;
        default:
          return instance;
      }
    instance = getNextHydratable(instance.nextSibling);
    if (null === instance) break;
  }
  return null;
}
function canHydrateTextInstance(instance, text, inRootOrSingleton) {
  if ("" === text) return null;
  for (; 3 !== instance.nodeType; ) {
    if ((1 !== instance.nodeType || "INPUT" !== instance.nodeName || "hidden" !== instance.type) && !inRootOrSingleton)
      return null;
    instance = getNextHydratable(instance.nextSibling);
    if (null === instance) return null;
  }
  return instance;
}
function getNextHydratable(node) {
  for (; null != node; node = node.nextSibling) {
    var nodeType = node.nodeType;
    if (1 === nodeType || 3 === nodeType) break;
    if (8 === nodeType) {
      nodeType = node.data;
      if ("$" === nodeType || "$!" === nodeType || "$?" === nodeType || "F!" === nodeType || "F" === nodeType)
        break;
      if ("/$" === nodeType) return null;
    }
  }
  return node;
}
function getParentSuspenseInstance(targetInstance) {
  targetInstance = targetInstance.previousSibling;
  for (var depth = 0; targetInstance; ) {
    if (8 === targetInstance.nodeType) {
      var data = targetInstance.data;
      if ("$" === data || "$!" === data || "$?" === data) {
        if (0 === depth) return targetInstance;
        depth--;
      } else "/$" === data && depth++;
    }
    targetInstance = targetInstance.previousSibling;
  }
  return null;
}
function resolveSingletonInstance(type, props, rootContainerInstance) {
  props = getOwnerDocumentFromRootContainer(rootContainerInstance);
  switch (type) {
    case "html":
      type = props.documentElement;
      if (!type) throw Error(formatProdErrorMessage(452));
      return type;
    case "head":
      type = props.head;
      if (!type) throw Error(formatProdErrorMessage(453));
      return type;
    case "body":
      type = props.body;
      if (!type) throw Error(formatProdErrorMessage(454));
      return type;
    default:
      throw Error(formatProdErrorMessage(451));
  }
}
var preloadPropsMap = /* @__PURE__ */ new Map(), preconnectsSet = /* @__PURE__ */ new Set();
function getHoistableRoot(container) {
  return "function" === typeof container.getRootNode ? container.getRootNode() : container.ownerDocument;
}
var previousDispatcher = ReactDOMSharedInternals.d;
ReactDOMSharedInternals.d = {
  f: flushSyncWork,
  r: requestFormReset,
  D: prefetchDNS,
  C: preconnect,
  L: preload,
  m: preloadModule,
  X: preinitScript,
  S: preinitStyle,
  M: preinitModuleScript
};
function flushSyncWork() {
  var previousWasRendering = previousDispatcher.f(), wasRendering = flushSyncWork$1();
  return previousWasRendering || wasRendering;
}
function requestFormReset(form) {
  var formInst = getInstanceFromNode(form);
  null !== formInst && 5 === formInst.tag && "form" === formInst.type ? requestFormReset$1(formInst) : previousDispatcher.r(form);
}
var globalDocument = "undefined" === typeof document ? null : document;
function preconnectAs(rel, href, crossOrigin) {
  var ownerDocument = globalDocument;
  if (ownerDocument && "string" === typeof href && href) {
    var limitedEscapedHref = escapeSelectorAttributeValueInsideDoubleQuotes(href);
    limitedEscapedHref = 'link[rel="' + rel + '"][href="' + limitedEscapedHref + '"]';
    "string" === typeof crossOrigin && (limitedEscapedHref += '[crossorigin="' + crossOrigin + '"]');
    preconnectsSet.has(limitedEscapedHref) || (preconnectsSet.add(limitedEscapedHref), rel = { rel, crossOrigin, href }, null === ownerDocument.querySelector(limitedEscapedHref) && (href = ownerDocument.createElement("link"), setInitialProperties(href, "link", rel), markNodeAsHoistable(href), ownerDocument.head.appendChild(href)));
  }
}
function prefetchDNS(href) {
  previousDispatcher.D(href);
  preconnectAs("dns-prefetch", href, null);
}
function preconnect(href, crossOrigin) {
  previousDispatcher.C(href, crossOrigin);
  preconnectAs("preconnect", href, crossOrigin);
}
function preload(href, as, options2) {
  previousDispatcher.L(href, as, options2);
  var ownerDocument = globalDocument;
  if (ownerDocument && href && as) {
    var preloadSelector = 'link[rel="preload"][as="' + escapeSelectorAttributeValueInsideDoubleQuotes(as) + '"]';
    "image" === as ? options2 && options2.imageSrcSet ? (preloadSelector += '[imagesrcset="' + escapeSelectorAttributeValueInsideDoubleQuotes(
      options2.imageSrcSet
    ) + '"]', "string" === typeof options2.imageSizes && (preloadSelector += '[imagesizes="' + escapeSelectorAttributeValueInsideDoubleQuotes(
      options2.imageSizes
    ) + '"]')) : preloadSelector += '[href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]' : preloadSelector += '[href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]';
    var key = preloadSelector;
    switch (as) {
      case "style":
        key = getStyleKey(href);
        break;
      case "script":
        key = getScriptKey(href);
    }
    preloadPropsMap.has(key) || (href = assign(
      {
        rel: "preload",
        href: "image" === as && options2 && options2.imageSrcSet ? void 0 : href,
        as
      },
      options2
    ), preloadPropsMap.set(key, href), null !== ownerDocument.querySelector(preloadSelector) || "style" === as && ownerDocument.querySelector(getStylesheetSelectorFromKey(key)) || "script" === as && ownerDocument.querySelector(getScriptSelectorFromKey(key)) || (as = ownerDocument.createElement("link"), setInitialProperties(as, "link", href), markNodeAsHoistable(as), ownerDocument.head.appendChild(as)));
  }
}
function preloadModule(href, options2) {
  previousDispatcher.m(href, options2);
  var ownerDocument = globalDocument;
  if (ownerDocument && href) {
    var as = options2 && "string" === typeof options2.as ? options2.as : "script", preloadSelector = 'link[rel="modulepreload"][as="' + escapeSelectorAttributeValueInsideDoubleQuotes(as) + '"][href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"]', key = preloadSelector;
    switch (as) {
      case "audioworklet":
      case "paintworklet":
      case "serviceworker":
      case "sharedworker":
      case "worker":
      case "script":
        key = getScriptKey(href);
    }
    if (!preloadPropsMap.has(key) && (href = assign({ rel: "modulepreload", href }, options2), preloadPropsMap.set(key, href), null === ownerDocument.querySelector(preloadSelector))) {
      switch (as) {
        case "audioworklet":
        case "paintworklet":
        case "serviceworker":
        case "sharedworker":
        case "worker":
        case "script":
          if (ownerDocument.querySelector(getScriptSelectorFromKey(key)))
            return;
      }
      as = ownerDocument.createElement("link");
      setInitialProperties(as, "link", href);
      markNodeAsHoistable(as);
      ownerDocument.head.appendChild(as);
    }
  }
}
function preinitStyle(href, precedence, options2) {
  previousDispatcher.S(href, precedence, options2);
  var ownerDocument = globalDocument;
  if (ownerDocument && href) {
    var styles = getResourcesFromRoot(ownerDocument).hoistableStyles, key = getStyleKey(href);
    precedence = precedence || "default";
    var resource = styles.get(key);
    if (!resource) {
      var state = { loading: 0, preload: null };
      if (resource = ownerDocument.querySelector(
        getStylesheetSelectorFromKey(key)
      ))
        state.loading = 5;
      else {
        href = assign(
          { rel: "stylesheet", href, "data-precedence": precedence },
          options2
        );
        (options2 = preloadPropsMap.get(key)) && adoptPreloadPropsForStylesheet(href, options2);
        var link = resource = ownerDocument.createElement("link");
        markNodeAsHoistable(link);
        setInitialProperties(link, "link", href);
        link._p = new Promise(function(resolve, reject) {
          link.onload = resolve;
          link.onerror = reject;
        });
        link.addEventListener("load", function() {
          state.loading |= 1;
        });
        link.addEventListener("error", function() {
          state.loading |= 2;
        });
        state.loading |= 4;
        insertStylesheet(resource, precedence, ownerDocument);
      }
      resource = {
        type: "stylesheet",
        instance: resource,
        count: 1,
        state
      };
      styles.set(key, resource);
    }
  }
}
function preinitScript(src, options2) {
  previousDispatcher.X(src, options2);
  var ownerDocument = globalDocument;
  if (ownerDocument && src) {
    var scripts = getResourcesFromRoot(ownerDocument).hoistableScripts, key = getScriptKey(src), resource = scripts.get(key);
    resource || (resource = ownerDocument.querySelector(getScriptSelectorFromKey(key)), resource || (src = assign({ src, async: true }, options2), (options2 = preloadPropsMap.get(key)) && adoptPreloadPropsForScript(src, options2), resource = ownerDocument.createElement("script"), markNodeAsHoistable(resource), setInitialProperties(resource, "link", src), ownerDocument.head.appendChild(resource)), resource = {
      type: "script",
      instance: resource,
      count: 1,
      state: null
    }, scripts.set(key, resource));
  }
}
function preinitModuleScript(src, options2) {
  previousDispatcher.M(src, options2);
  var ownerDocument = globalDocument;
  if (ownerDocument && src) {
    var scripts = getResourcesFromRoot(ownerDocument).hoistableScripts, key = getScriptKey(src), resource = scripts.get(key);
    resource || (resource = ownerDocument.querySelector(getScriptSelectorFromKey(key)), resource || (src = assign({ src, async: true, type: "module" }, options2), (options2 = preloadPropsMap.get(key)) && adoptPreloadPropsForScript(src, options2), resource = ownerDocument.createElement("script"), markNodeAsHoistable(resource), setInitialProperties(resource, "link", src), ownerDocument.head.appendChild(resource)), resource = {
      type: "script",
      instance: resource,
      count: 1,
      state: null
    }, scripts.set(key, resource));
  }
}
function getResource(type, currentProps, pendingProps, currentResource) {
  var JSCompiler_inline_result = (JSCompiler_inline_result = rootInstanceStackCursor.current) ? getHoistableRoot(JSCompiler_inline_result) : null;
  if (!JSCompiler_inline_result) throw Error(formatProdErrorMessage(446));
  switch (type) {
    case "meta":
    case "title":
      return null;
    case "style":
      return "string" === typeof pendingProps.precedence && "string" === typeof pendingProps.href ? (currentProps = getStyleKey(pendingProps.href), pendingProps = getResourcesFromRoot(
        JSCompiler_inline_result
      ).hoistableStyles, currentResource = pendingProps.get(currentProps), currentResource || (currentResource = {
        type: "style",
        instance: null,
        count: 0,
        state: null
      }, pendingProps.set(currentProps, currentResource)), currentResource) : { type: "void", instance: null, count: 0, state: null };
    case "link":
      if ("stylesheet" === pendingProps.rel && "string" === typeof pendingProps.href && "string" === typeof pendingProps.precedence) {
        type = getStyleKey(pendingProps.href);
        var styles$242 = getResourcesFromRoot(
          JSCompiler_inline_result
        ).hoistableStyles, resource$243 = styles$242.get(type);
        resource$243 || (JSCompiler_inline_result = JSCompiler_inline_result.ownerDocument || JSCompiler_inline_result, resource$243 = {
          type: "stylesheet",
          instance: null,
          count: 0,
          state: { loading: 0, preload: null }
        }, styles$242.set(type, resource$243), (styles$242 = JSCompiler_inline_result.querySelector(
          getStylesheetSelectorFromKey(type)
        )) && !styles$242._p && (resource$243.instance = styles$242, resource$243.state.loading = 5), preloadPropsMap.has(type) || (pendingProps = {
          rel: "preload",
          as: "style",
          href: pendingProps.href,
          crossOrigin: pendingProps.crossOrigin,
          integrity: pendingProps.integrity,
          media: pendingProps.media,
          hrefLang: pendingProps.hrefLang,
          referrerPolicy: pendingProps.referrerPolicy
        }, preloadPropsMap.set(type, pendingProps), styles$242 || preloadStylesheet(
          JSCompiler_inline_result,
          type,
          pendingProps,
          resource$243.state
        )));
        if (currentProps && null === currentResource)
          throw Error(formatProdErrorMessage(528, ""));
        return resource$243;
      }
      if (currentProps && null !== currentResource)
        throw Error(formatProdErrorMessage(529, ""));
      return null;
    case "script":
      return currentProps = pendingProps.async, pendingProps = pendingProps.src, "string" === typeof pendingProps && currentProps && "function" !== typeof currentProps && "symbol" !== typeof currentProps ? (currentProps = getScriptKey(pendingProps), pendingProps = getResourcesFromRoot(
        JSCompiler_inline_result
      ).hoistableScripts, currentResource = pendingProps.get(currentProps), currentResource || (currentResource = {
        type: "script",
        instance: null,
        count: 0,
        state: null
      }, pendingProps.set(currentProps, currentResource)), currentResource) : { type: "void", instance: null, count: 0, state: null };
    default:
      throw Error(formatProdErrorMessage(444, type));
  }
}
function getStyleKey(href) {
  return 'href="' + escapeSelectorAttributeValueInsideDoubleQuotes(href) + '"';
}
function getStylesheetSelectorFromKey(key) {
  return 'link[rel="stylesheet"][' + key + "]";
}
function stylesheetPropsFromRawProps(rawProps) {
  return assign({}, rawProps, {
    "data-precedence": rawProps.precedence,
    precedence: null
  });
}
function preloadStylesheet(ownerDocument, key, preloadProps, state) {
  ownerDocument.querySelector('link[rel="preload"][as="style"][' + key + "]") ? state.loading = 1 : (key = ownerDocument.createElement("link"), state.preload = key, key.addEventListener("load", function() {
    return state.loading |= 1;
  }), key.addEventListener("error", function() {
    return state.loading |= 2;
  }), setInitialProperties(key, "link", preloadProps), markNodeAsHoistable(key), ownerDocument.head.appendChild(key));
}
function getScriptKey(src) {
  return '[src="' + escapeSelectorAttributeValueInsideDoubleQuotes(src) + '"]';
}
function getScriptSelectorFromKey(key) {
  return "script[async]" + key;
}
function acquireResource(hoistableRoot, resource, props) {
  resource.count++;
  if (null === resource.instance)
    switch (resource.type) {
      case "style":
        var instance = hoistableRoot.querySelector(
          'style[data-href~="' + escapeSelectorAttributeValueInsideDoubleQuotes(props.href) + '"]'
        );
        if (instance)
          return resource.instance = instance, markNodeAsHoistable(instance), instance;
        var styleProps = assign({}, props, {
          "data-href": props.href,
          "data-precedence": props.precedence,
          href: null,
          precedence: null
        });
        instance = (hoistableRoot.ownerDocument || hoistableRoot).createElement(
          "style"
        );
        markNodeAsHoistable(instance);
        setInitialProperties(instance, "style", styleProps);
        insertStylesheet(instance, props.precedence, hoistableRoot);
        return resource.instance = instance;
      case "stylesheet":
        styleProps = getStyleKey(props.href);
        var instance$248 = hoistableRoot.querySelector(
          getStylesheetSelectorFromKey(styleProps)
        );
        if (instance$248)
          return resource.state.loading |= 4, resource.instance = instance$248, markNodeAsHoistable(instance$248), instance$248;
        instance = stylesheetPropsFromRawProps(props);
        (styleProps = preloadPropsMap.get(styleProps)) && adoptPreloadPropsForStylesheet(instance, styleProps);
        instance$248 = (hoistableRoot.ownerDocument || hoistableRoot).createElement("link");
        markNodeAsHoistable(instance$248);
        var linkInstance = instance$248;
        linkInstance._p = new Promise(function(resolve, reject) {
          linkInstance.onload = resolve;
          linkInstance.onerror = reject;
        });
        setInitialProperties(instance$248, "link", instance);
        resource.state.loading |= 4;
        insertStylesheet(instance$248, props.precedence, hoistableRoot);
        return resource.instance = instance$248;
      case "script":
        instance$248 = getScriptKey(props.src);
        if (styleProps = hoistableRoot.querySelector(
          getScriptSelectorFromKey(instance$248)
        ))
          return resource.instance = styleProps, markNodeAsHoistable(styleProps), styleProps;
        instance = props;
        if (styleProps = preloadPropsMap.get(instance$248))
          instance = assign({}, props), adoptPreloadPropsForScript(instance, styleProps);
        hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
        styleProps = hoistableRoot.createElement("script");
        markNodeAsHoistable(styleProps);
        setInitialProperties(styleProps, "link", instance);
        hoistableRoot.head.appendChild(styleProps);
        return resource.instance = styleProps;
      case "void":
        return null;
      default:
        throw Error(formatProdErrorMessage(443, resource.type));
    }
  else
    "stylesheet" === resource.type && 0 === (resource.state.loading & 4) && (instance = resource.instance, resource.state.loading |= 4, insertStylesheet(instance, props.precedence, hoistableRoot));
  return resource.instance;
}
function insertStylesheet(instance, precedence, root2) {
  for (var nodes = root2.querySelectorAll(
    'link[rel="stylesheet"][data-precedence],style[data-precedence]'
  ), last = nodes.length ? nodes[nodes.length - 1] : null, prior = last, i = 0; i < nodes.length; i++) {
    var node = nodes[i];
    if (node.dataset.precedence === precedence) prior = node;
    else if (prior !== last) break;
  }
  prior ? prior.parentNode.insertBefore(instance, prior.nextSibling) : (precedence = 9 === root2.nodeType ? root2.head : root2, precedence.insertBefore(instance, precedence.firstChild));
}
function adoptPreloadPropsForStylesheet(stylesheetProps, preloadProps) {
  null == stylesheetProps.crossOrigin && (stylesheetProps.crossOrigin = preloadProps.crossOrigin);
  null == stylesheetProps.referrerPolicy && (stylesheetProps.referrerPolicy = preloadProps.referrerPolicy);
  null == stylesheetProps.title && (stylesheetProps.title = preloadProps.title);
}
function adoptPreloadPropsForScript(scriptProps, preloadProps) {
  null == scriptProps.crossOrigin && (scriptProps.crossOrigin = preloadProps.crossOrigin);
  null == scriptProps.referrerPolicy && (scriptProps.referrerPolicy = preloadProps.referrerPolicy);
  null == scriptProps.integrity && (scriptProps.integrity = preloadProps.integrity);
}
var tagCaches = null;
function getHydratableHoistableCache(type, keyAttribute, ownerDocument) {
  if (null === tagCaches) {
    var cache = /* @__PURE__ */ new Map();
    var caches = tagCaches = /* @__PURE__ */ new Map();
    caches.set(ownerDocument, cache);
  } else
    caches = tagCaches, cache = caches.get(ownerDocument), cache || (cache = /* @__PURE__ */ new Map(), caches.set(ownerDocument, cache));
  if (cache.has(type)) return cache;
  cache.set(type, null);
  ownerDocument = ownerDocument.getElementsByTagName(type);
  for (caches = 0; caches < ownerDocument.length; caches++) {
    var node = ownerDocument[caches];
    if (!(node[internalHoistableMarker] || node[internalInstanceKey] || "link" === type && "stylesheet" === node.getAttribute("rel")) && "http://www.w3.org/2000/svg" !== node.namespaceURI) {
      var nodeKey = node.getAttribute(keyAttribute) || "";
      nodeKey = type + nodeKey;
      var existing = cache.get(nodeKey);
      existing ? existing.push(node) : cache.set(nodeKey, [node]);
    }
  }
  return cache;
}
function mountHoistable(hoistableRoot, type, instance) {
  hoistableRoot = hoistableRoot.ownerDocument || hoistableRoot;
  hoistableRoot.head.insertBefore(
    instance,
    "title" === type ? hoistableRoot.querySelector("head > title") : null
  );
}
function isHostHoistableType(type, props, hostContext) {
  if (1 === hostContext || null != props.itemProp) return false;
  switch (type) {
    case "meta":
    case "title":
      return true;
    case "style":
      if ("string" !== typeof props.precedence || "string" !== typeof props.href || "" === props.href)
        break;
      return true;
    case "link":
      if ("string" !== typeof props.rel || "string" !== typeof props.href || "" === props.href || props.onLoad || props.onError)
        break;
      switch (props.rel) {
        case "stylesheet":
          return type = props.disabled, "string" === typeof props.precedence && null == type;
        default:
          return true;
      }
    case "script":
      if (props.async && "function" !== typeof props.async && "symbol" !== typeof props.async && !props.onLoad && !props.onError && props.src && "string" === typeof props.src)
        return true;
  }
  return false;
}
function preloadResource(resource) {
  return "stylesheet" === resource.type && 0 === (resource.state.loading & 3) ? false : true;
}
var suspendedState = null;
function noop() {
}
function suspendResource(hoistableRoot, resource, props) {
  if (null === suspendedState) throw Error(formatProdErrorMessage(475));
  var state = suspendedState;
  if ("stylesheet" === resource.type && ("string" !== typeof props.media || false !== matchMedia(props.media).matches) && 0 === (resource.state.loading & 4)) {
    if (null === resource.instance) {
      var key = getStyleKey(props.href), instance = hoistableRoot.querySelector(
        getStylesheetSelectorFromKey(key)
      );
      if (instance) {
        hoistableRoot = instance._p;
        null !== hoistableRoot && "object" === typeof hoistableRoot && "function" === typeof hoistableRoot.then && (state.count++, state = onUnsuspend.bind(state), hoistableRoot.then(state, state));
        resource.state.loading |= 4;
        resource.instance = instance;
        markNodeAsHoistable(instance);
        return;
      }
      instance = hoistableRoot.ownerDocument || hoistableRoot;
      props = stylesheetPropsFromRawProps(props);
      (key = preloadPropsMap.get(key)) && adoptPreloadPropsForStylesheet(props, key);
      instance = instance.createElement("link");
      markNodeAsHoistable(instance);
      var linkInstance = instance;
      linkInstance._p = new Promise(function(resolve, reject) {
        linkInstance.onload = resolve;
        linkInstance.onerror = reject;
      });
      setInitialProperties(instance, "link", props);
      resource.instance = instance;
    }
    null === state.stylesheets && (state.stylesheets = /* @__PURE__ */ new Map());
    state.stylesheets.set(resource, hoistableRoot);
    (hoistableRoot = resource.state.preload) && 0 === (resource.state.loading & 3) && (state.count++, resource = onUnsuspend.bind(state), hoistableRoot.addEventListener("load", resource), hoistableRoot.addEventListener("error", resource));
  }
}
function waitForCommitToBeReady() {
  if (null === suspendedState) throw Error(formatProdErrorMessage(475));
  var state = suspendedState;
  state.stylesheets && 0 === state.count && insertSuspendedStylesheets(state, state.stylesheets);
  return 0 < state.count ? function(commit) {
    var stylesheetTimer = setTimeout(function() {
      state.stylesheets && insertSuspendedStylesheets(state, state.stylesheets);
      if (state.unsuspend) {
        var unsuspend = state.unsuspend;
        state.unsuspend = null;
        unsuspend();
      }
    }, 6e4);
    state.unsuspend = commit;
    return function() {
      state.unsuspend = null;
      clearTimeout(stylesheetTimer);
    };
  } : null;
}
function onUnsuspend() {
  this.count--;
  if (0 === this.count) {
    if (this.stylesheets) insertSuspendedStylesheets(this, this.stylesheets);
    else if (this.unsuspend) {
      var unsuspend = this.unsuspend;
      this.unsuspend = null;
      unsuspend();
    }
  }
}
var precedencesByRoot = null;
function insertSuspendedStylesheets(state, resources) {
  state.stylesheets = null;
  null !== state.unsuspend && (state.count++, precedencesByRoot = /* @__PURE__ */ new Map(), resources.forEach(insertStylesheetIntoRoot, state), precedencesByRoot = null, onUnsuspend.call(state));
}
function insertStylesheetIntoRoot(root2, resource) {
  if (!(resource.state.loading & 4)) {
    var precedences = precedencesByRoot.get(root2);
    if (precedences) var last = precedences.get(null);
    else {
      precedences = /* @__PURE__ */ new Map();
      precedencesByRoot.set(root2, precedences);
      for (var nodes = root2.querySelectorAll(
        "link[data-precedence],style[data-precedence]"
      ), i = 0; i < nodes.length; i++) {
        var node = nodes[i];
        if ("LINK" === node.nodeName || "not all" !== node.getAttribute("media"))
          precedences.set(node.dataset.precedence, node), last = node;
      }
      last && precedences.set(null, last);
    }
    nodes = resource.instance;
    node = nodes.getAttribute("data-precedence");
    i = precedences.get(node) || last;
    i === last && precedences.set(null, nodes);
    precedences.set(node, nodes);
    this.count++;
    last = onUnsuspend.bind(this);
    nodes.addEventListener("load", last);
    nodes.addEventListener("error", last);
    i ? i.parentNode.insertBefore(nodes, i.nextSibling) : (root2 = 9 === root2.nodeType ? root2.head : root2, root2.insertBefore(nodes, root2.firstChild));
    resource.state.loading |= 4;
  }
}
var HostTransitionContext = {
  $$typeof: REACT_CONTEXT_TYPE,
  Provider: null,
  Consumer: null,
  _currentValue: sharedNotPendingObject,
  _currentValue2: sharedNotPendingObject,
  _threadCount: 0
};
function FiberRootNode(containerInfo, tag, hydrate, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, formState) {
  this.tag = 1;
  this.containerInfo = containerInfo;
  this.finishedWork = this.pingCache = this.current = this.pendingChildren = null;
  this.timeoutHandle = -1;
  this.callbackNode = this.next = this.pendingContext = this.context = this.cancelPendingCommit = null;
  this.callbackPriority = 0;
  this.expirationTimes = createLaneMap(-1);
  this.entangledLanes = this.shellSuspendCounter = this.errorRecoveryDisabledLanes = this.finishedLanes = this.expiredLanes = this.warmLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0;
  this.entanglements = createLaneMap(0);
  this.hiddenUpdates = createLaneMap(null);
  this.identifierPrefix = identifierPrefix;
  this.onUncaughtError = onUncaughtError;
  this.onCaughtError = onCaughtError;
  this.onRecoverableError = onRecoverableError;
  this.pooledCache = null;
  this.pooledCacheLanes = 0;
  this.formState = formState;
  this.incompleteTransitions = /* @__PURE__ */ new Map();
}
function createFiberRoot(containerInfo, tag, hydrate, initialChildren, hydrationCallbacks, isStrictMode, identifierPrefix, onUncaughtError, onCaughtError, onRecoverableError, transitionCallbacks, formState) {
  containerInfo = new FiberRootNode(
    containerInfo,
    tag,
    hydrate,
    identifierPrefix,
    onUncaughtError,
    onCaughtError,
    onRecoverableError,
    formState
  );
  tag = 1;
  true === isStrictMode && (tag |= 24);
  isStrictMode = createFiberImplClass(3, null, null, tag);
  containerInfo.current = isStrictMode;
  isStrictMode.stateNode = containerInfo;
  tag = createCache();
  tag.refCount++;
  containerInfo.pooledCache = tag;
  tag.refCount++;
  isStrictMode.memoizedState = {
    element: initialChildren,
    isDehydrated: hydrate,
    cache: tag
  };
  initializeUpdateQueue(isStrictMode);
  return containerInfo;
}
function getContextForSubtree(parentComponent) {
  if (!parentComponent) return emptyContextObject;
  parentComponent = emptyContextObject;
  return parentComponent;
}
function updateContainerImpl(rootFiber, lane, element, container, parentComponent, callback) {
  parentComponent = getContextForSubtree(parentComponent);
  null === container.context ? container.context = parentComponent : container.pendingContext = parentComponent;
  container = createUpdate(lane);
  container.payload = { element };
  callback = void 0 === callback ? null : callback;
  null !== callback && (container.callback = callback);
  element = enqueueUpdate(rootFiber, container, lane);
  null !== element && (scheduleUpdateOnFiber(element, rootFiber, lane), entangleTransitions(element, rootFiber, lane));
}
function markRetryLaneImpl(fiber, retryLane) {
  fiber = fiber.memoizedState;
  if (null !== fiber && null !== fiber.dehydrated) {
    var a = fiber.retryLane;
    fiber.retryLane = 0 !== a && a < retryLane ? a : retryLane;
  }
}
function markRetryLaneIfNotHydrated(fiber, retryLane) {
  markRetryLaneImpl(fiber, retryLane);
  (fiber = fiber.alternate) && markRetryLaneImpl(fiber, retryLane);
}
function attemptContinuousHydration(fiber) {
  if (13 === fiber.tag) {
    var root2 = enqueueConcurrentRenderForLane(fiber, 67108864);
    null !== root2 && scheduleUpdateOnFiber(root2, fiber, 67108864);
    markRetryLaneIfNotHydrated(fiber, 67108864);
  }
}
var _enabled = true;
function dispatchDiscreteEvent(domEventName, eventSystemFlags, container, nativeEvent) {
  var prevTransition = ReactSharedInternals.T;
  ReactSharedInternals.T = null;
  var previousPriority = ReactDOMSharedInternals.p;
  try {
    ReactDOMSharedInternals.p = 2, dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
  } finally {
    ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition;
  }
}
function dispatchContinuousEvent(domEventName, eventSystemFlags, container, nativeEvent) {
  var prevTransition = ReactSharedInternals.T;
  ReactSharedInternals.T = null;
  var previousPriority = ReactDOMSharedInternals.p;
  try {
    ReactDOMSharedInternals.p = 8, dispatchEvent(domEventName, eventSystemFlags, container, nativeEvent);
  } finally {
    ReactDOMSharedInternals.p = previousPriority, ReactSharedInternals.T = prevTransition;
  }
}
function dispatchEvent(domEventName, eventSystemFlags, targetContainer, nativeEvent) {
  if (_enabled) {
    var blockedOn = findInstanceBlockingEvent(nativeEvent);
    if (null === blockedOn)
      dispatchEventForPluginEventSystem(
        domEventName,
        eventSystemFlags,
        nativeEvent,
        return_targetInst,
        targetContainer
      ), clearIfContinuousEvent(domEventName, nativeEvent);
    else if (queueIfContinuousEvent(
      blockedOn,
      domEventName,
      eventSystemFlags,
      targetContainer,
      nativeEvent
    ))
      nativeEvent.stopPropagation();
    else if (clearIfContinuousEvent(domEventName, nativeEvent), eventSystemFlags & 4 && -1 < discreteReplayableEvents.indexOf(domEventName)) {
      for (; null !== blockedOn; ) {
        var fiber = getInstanceFromNode(blockedOn);
        if (null !== fiber)
          switch (fiber.tag) {
            case 3:
              fiber = fiber.stateNode;
              if (fiber.current.memoizedState.isDehydrated) {
                var lanes = getHighestPriorityLanes(fiber.pendingLanes);
                if (0 !== lanes) {
                  var root2 = fiber;
                  root2.pendingLanes |= 2;
                  for (root2.entangledLanes |= 2; lanes; ) {
                    var lane = 1 << 31 - clz32(lanes);
                    root2.entanglements[1] |= lane;
                    lanes &= ~lane;
                  }
                  ensureRootIsScheduled(fiber);
                  0 === (executionContext & 6) && (workInProgressRootRenderTargetTime = now() + 500, flushSyncWorkAcrossRoots_impl(0));
                }
              }
              break;
            case 13:
              root2 = enqueueConcurrentRenderForLane(fiber, 2), null !== root2 && scheduleUpdateOnFiber(root2, fiber, 2), flushSyncWork$1(), markRetryLaneIfNotHydrated(fiber, 2);
          }
        fiber = findInstanceBlockingEvent(nativeEvent);
        null === fiber && dispatchEventForPluginEventSystem(
          domEventName,
          eventSystemFlags,
          nativeEvent,
          return_targetInst,
          targetContainer
        );
        if (fiber === blockedOn) break;
        blockedOn = fiber;
      }
      null !== blockedOn && nativeEvent.stopPropagation();
    } else
      dispatchEventForPluginEventSystem(
        domEventName,
        eventSystemFlags,
        nativeEvent,
        null,
        targetContainer
      );
  }
}
function findInstanceBlockingEvent(nativeEvent) {
  nativeEvent = getEventTarget(nativeEvent);
  return findInstanceBlockingTarget(nativeEvent);
}
var return_targetInst = null;
function findInstanceBlockingTarget(targetNode) {
  return_targetInst = null;
  targetNode = getClosestInstanceFromNode(targetNode);
  if (null !== targetNode) {
    var nearestMounted = getNearestMountedFiber(targetNode);
    if (null === nearestMounted) targetNode = null;
    else {
      var tag = nearestMounted.tag;
      if (13 === tag) {
        targetNode = getSuspenseInstanceFromFiber(nearestMounted);
        if (null !== targetNode) return targetNode;
        targetNode = null;
      } else if (3 === tag) {
        if (nearestMounted.stateNode.current.memoizedState.isDehydrated)
          return 3 === nearestMounted.tag ? nearestMounted.stateNode.containerInfo : null;
        targetNode = null;
      } else nearestMounted !== targetNode && (targetNode = null);
    }
  }
  return_targetInst = targetNode;
  return null;
}
function getEventPriority(domEventName) {
  switch (domEventName) {
    case "beforetoggle":
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "toggle":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 2;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 8;
    case "message":
      switch (getCurrentPriorityLevel()) {
        case ImmediatePriority:
          return 2;
        case UserBlockingPriority:
          return 8;
        case NormalPriority$1:
        case LowPriority:
          return 32;
        case IdlePriority:
          return 268435456;
        default:
          return 32;
      }
    default:
      return 32;
  }
}
var hasScheduledReplayAttempt = false, queuedFocus = null, queuedDrag = null, queuedMouse = null, queuedPointers = /* @__PURE__ */ new Map(), queuedPointerCaptures = /* @__PURE__ */ new Map(), queuedExplicitHydrationTargets = [], discreteReplayableEvents = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset".split(
  " "
);
function clearIfContinuousEvent(domEventName, nativeEvent) {
  switch (domEventName) {
    case "focusin":
    case "focusout":
      queuedFocus = null;
      break;
    case "dragenter":
    case "dragleave":
      queuedDrag = null;
      break;
    case "mouseover":
    case "mouseout":
      queuedMouse = null;
      break;
    case "pointerover":
    case "pointerout":
      queuedPointers.delete(nativeEvent.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      queuedPointerCaptures.delete(nativeEvent.pointerId);
  }
}
function accumulateOrCreateContinuousQueuedReplayableEvent(existingQueuedEvent, blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
  if (null === existingQueuedEvent || existingQueuedEvent.nativeEvent !== nativeEvent)
    return existingQueuedEvent = {
      blockedOn,
      domEventName,
      eventSystemFlags,
      nativeEvent,
      targetContainers: [targetContainer]
    }, null !== blockedOn && (blockedOn = getInstanceFromNode(blockedOn), null !== blockedOn && attemptContinuousHydration(blockedOn)), existingQueuedEvent;
  existingQueuedEvent.eventSystemFlags |= eventSystemFlags;
  blockedOn = existingQueuedEvent.targetContainers;
  null !== targetContainer && -1 === blockedOn.indexOf(targetContainer) && blockedOn.push(targetContainer);
  return existingQueuedEvent;
}
function queueIfContinuousEvent(blockedOn, domEventName, eventSystemFlags, targetContainer, nativeEvent) {
  switch (domEventName) {
    case "focusin":
      return queuedFocus = accumulateOrCreateContinuousQueuedReplayableEvent(
        queuedFocus,
        blockedOn,
        domEventName,
        eventSystemFlags,
        targetContainer,
        nativeEvent
      ), true;
    case "dragenter":
      return queuedDrag = accumulateOrCreateContinuousQueuedReplayableEvent(
        queuedDrag,
        blockedOn,
        domEventName,
        eventSystemFlags,
        targetContainer,
        nativeEvent
      ), true;
    case "mouseover":
      return queuedMouse = accumulateOrCreateContinuousQueuedReplayableEvent(
        queuedMouse,
        blockedOn,
        domEventName,
        eventSystemFlags,
        targetContainer,
        nativeEvent
      ), true;
    case "pointerover":
      var pointerId = nativeEvent.pointerId;
      queuedPointers.set(
        pointerId,
        accumulateOrCreateContinuousQueuedReplayableEvent(
          queuedPointers.get(pointerId) || null,
          blockedOn,
          domEventName,
          eventSystemFlags,
          targetContainer,
          nativeEvent
        )
      );
      return true;
    case "gotpointercapture":
      return pointerId = nativeEvent.pointerId, queuedPointerCaptures.set(
        pointerId,
        accumulateOrCreateContinuousQueuedReplayableEvent(
          queuedPointerCaptures.get(pointerId) || null,
          blockedOn,
          domEventName,
          eventSystemFlags,
          targetContainer,
          nativeEvent
        )
      ), true;
  }
  return false;
}
function attemptExplicitHydrationTarget(queuedTarget) {
  var targetInst = getClosestInstanceFromNode(queuedTarget.target);
  if (null !== targetInst) {
    var nearestMounted = getNearestMountedFiber(targetInst);
    if (null !== nearestMounted) {
      if (targetInst = nearestMounted.tag, 13 === targetInst) {
        if (targetInst = getSuspenseInstanceFromFiber(nearestMounted), null !== targetInst) {
          queuedTarget.blockedOn = targetInst;
          runWithPriority(queuedTarget.priority, function() {
            if (13 === nearestMounted.tag) {
              var lane = requestUpdateLane(), root2 = enqueueConcurrentRenderForLane(nearestMounted, lane);
              null !== root2 && scheduleUpdateOnFiber(root2, nearestMounted, lane);
              markRetryLaneIfNotHydrated(nearestMounted, lane);
            }
          });
          return;
        }
      } else if (3 === targetInst && nearestMounted.stateNode.current.memoizedState.isDehydrated) {
        queuedTarget.blockedOn = 3 === nearestMounted.tag ? nearestMounted.stateNode.containerInfo : null;
        return;
      }
    }
  }
  queuedTarget.blockedOn = null;
}
function attemptReplayContinuousQueuedEvent(queuedEvent) {
  if (null !== queuedEvent.blockedOn) return false;
  for (var targetContainers = queuedEvent.targetContainers; 0 < targetContainers.length; ) {
    var nextBlockedOn = findInstanceBlockingEvent(queuedEvent.nativeEvent);
    if (null === nextBlockedOn) {
      nextBlockedOn = queuedEvent.nativeEvent;
      var nativeEventClone = new nextBlockedOn.constructor(
        nextBlockedOn.type,
        nextBlockedOn
      );
      currentReplayingEvent = nativeEventClone;
      nextBlockedOn.target.dispatchEvent(nativeEventClone);
      currentReplayingEvent = null;
    } else
      return targetContainers = getInstanceFromNode(nextBlockedOn), null !== targetContainers && attemptContinuousHydration(targetContainers), queuedEvent.blockedOn = nextBlockedOn, false;
    targetContainers.shift();
  }
  return true;
}
function attemptReplayContinuousQueuedEventInMap(queuedEvent, key, map) {
  attemptReplayContinuousQueuedEvent(queuedEvent) && map.delete(key);
}
function replayUnblockedEvents() {
  hasScheduledReplayAttempt = false;
  null !== queuedFocus && attemptReplayContinuousQueuedEvent(queuedFocus) && (queuedFocus = null);
  null !== queuedDrag && attemptReplayContinuousQueuedEvent(queuedDrag) && (queuedDrag = null);
  null !== queuedMouse && attemptReplayContinuousQueuedEvent(queuedMouse) && (queuedMouse = null);
  queuedPointers.forEach(attemptReplayContinuousQueuedEventInMap);
  queuedPointerCaptures.forEach(attemptReplayContinuousQueuedEventInMap);
}
function scheduleCallbackIfUnblocked(queuedEvent, unblocked) {
  queuedEvent.blockedOn === unblocked && (queuedEvent.blockedOn = null, hasScheduledReplayAttempt || (hasScheduledReplayAttempt = true, Scheduler.unstable_scheduleCallback(
    Scheduler.unstable_NormalPriority,
    replayUnblockedEvents
  )));
}
var lastScheduledReplayQueue = null;
function scheduleReplayQueueIfNeeded(formReplayingQueue) {
  lastScheduledReplayQueue !== formReplayingQueue && (lastScheduledReplayQueue = formReplayingQueue, Scheduler.unstable_scheduleCallback(
    Scheduler.unstable_NormalPriority,
    function() {
      lastScheduledReplayQueue === formReplayingQueue && (lastScheduledReplayQueue = null);
      for (var i = 0; i < formReplayingQueue.length; i += 3) {
        var form = formReplayingQueue[i], submitterOrAction = formReplayingQueue[i + 1], formData = formReplayingQueue[i + 2];
        if ("function" !== typeof submitterOrAction)
          if (null === findInstanceBlockingTarget(submitterOrAction || form))
            continue;
          else break;
        var formInst = getInstanceFromNode(form);
        null !== formInst && (formReplayingQueue.splice(i, 3), i -= 3, startHostTransition(
          formInst,
          {
            pending: true,
            data: formData,
            method: form.method,
            action: submitterOrAction
          },
          submitterOrAction,
          formData
        ));
      }
    }
  ));
}
function retryIfBlockedOn(unblocked) {
  function unblock(queuedEvent) {
    return scheduleCallbackIfUnblocked(queuedEvent, unblocked);
  }
  null !== queuedFocus && scheduleCallbackIfUnblocked(queuedFocus, unblocked);
  null !== queuedDrag && scheduleCallbackIfUnblocked(queuedDrag, unblocked);
  null !== queuedMouse && scheduleCallbackIfUnblocked(queuedMouse, unblocked);
  queuedPointers.forEach(unblock);
  queuedPointerCaptures.forEach(unblock);
  for (var i = 0; i < queuedExplicitHydrationTargets.length; i++) {
    var queuedTarget = queuedExplicitHydrationTargets[i];
    queuedTarget.blockedOn === unblocked && (queuedTarget.blockedOn = null);
  }
  for (; 0 < queuedExplicitHydrationTargets.length && (i = queuedExplicitHydrationTargets[0], null === i.blockedOn); )
    attemptExplicitHydrationTarget(i), null === i.blockedOn && queuedExplicitHydrationTargets.shift();
  i = (unblocked.ownerDocument || unblocked).$$reactFormReplay;
  if (null != i)
    for (queuedTarget = 0; queuedTarget < i.length; queuedTarget += 3) {
      var form = i[queuedTarget], submitterOrAction = i[queuedTarget + 1], formProps = form[internalPropsKey] || null;
      if ("function" === typeof submitterOrAction)
        formProps || scheduleReplayQueueIfNeeded(i);
      else if (formProps) {
        var action = null;
        if (submitterOrAction && submitterOrAction.hasAttribute("formAction"))
          if (form = submitterOrAction, formProps = submitterOrAction[internalPropsKey] || null)
            action = formProps.formAction;
          else {
            if (null !== findInstanceBlockingTarget(form)) continue;
          }
        else action = formProps.action;
        "function" === typeof action ? i[queuedTarget + 1] = action : (i.splice(queuedTarget, 3), queuedTarget -= 3);
        scheduleReplayQueueIfNeeded(i);
      }
    }
}
function ReactDOMRoot(internalRoot) {
  this._internalRoot = internalRoot;
}
ReactDOMHydrationRoot.prototype.render = ReactDOMRoot.prototype.render = function(children) {
  var root2 = this._internalRoot;
  if (null === root2) throw Error(formatProdErrorMessage(409));
  var current = root2.current, lane = requestUpdateLane();
  updateContainerImpl(current, lane, children, root2, null, null);
};
ReactDOMHydrationRoot.prototype.unmount = ReactDOMRoot.prototype.unmount = function() {
  var root2 = this._internalRoot;
  if (null !== root2) {
    this._internalRoot = null;
    var container = root2.containerInfo;
    0 === root2.tag && flushPassiveEffects();
    updateContainerImpl(root2.current, 2, null, root2, null, null);
    flushSyncWork$1();
    container[internalContainerInstanceKey] = null;
  }
};
function ReactDOMHydrationRoot(internalRoot) {
  this._internalRoot = internalRoot;
}
ReactDOMHydrationRoot.prototype.unstable_scheduleHydration = function(target) {
  if (target) {
    var updatePriority = resolveUpdatePriority();
    target = { blockedOn: null, target, priority: updatePriority };
    for (var i = 0; i < queuedExplicitHydrationTargets.length && 0 !== updatePriority && updatePriority < queuedExplicitHydrationTargets[i].priority; i++) ;
    queuedExplicitHydrationTargets.splice(i, 0, target);
    0 === i && attemptExplicitHydrationTarget(target);
  }
};
var isomorphicReactPackageVersion$jscomp$inline_1686 = React$3.version;
if ("19.0.0" !== isomorphicReactPackageVersion$jscomp$inline_1686)
  throw Error(
    formatProdErrorMessage(
      527,
      isomorphicReactPackageVersion$jscomp$inline_1686,
      "19.0.0"
    )
  );
ReactDOMSharedInternals.findDOMNode = function(componentOrElement) {
  var fiber = componentOrElement._reactInternals;
  if (void 0 === fiber) {
    if ("function" === typeof componentOrElement.render)
      throw Error(formatProdErrorMessage(188));
    componentOrElement = Object.keys(componentOrElement).join(",");
    throw Error(formatProdErrorMessage(268, componentOrElement));
  }
  componentOrElement = findCurrentFiberUsingSlowPath(fiber);
  componentOrElement = null !== componentOrElement ? findCurrentHostFiberImpl(componentOrElement) : null;
  componentOrElement = null === componentOrElement ? null : componentOrElement.stateNode;
  return componentOrElement;
};
var internals$jscomp$inline_2165 = {
  bundleType: 0,
  version: "19.0.0",
  rendererPackageName: "react-dom",
  currentDispatcherRef: ReactSharedInternals,
  findFiberByHostInstance: getClosestInstanceFromNode,
  reconcilerVersion: "19.0.0"
};
if ("undefined" !== typeof __REACT_DEVTOOLS_GLOBAL_HOOK__) {
  var hook$jscomp$inline_2166 = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!hook$jscomp$inline_2166.isDisabled && hook$jscomp$inline_2166.supportsFiber)
    try {
      rendererID = hook$jscomp$inline_2166.inject(
        internals$jscomp$inline_2165
      ), injectedHook = hook$jscomp$inline_2166;
    } catch (err) {
    }
}
reactDomClient_production.createRoot = function(container, options2) {
  if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
  var isStrictMode = false, identifierPrefix = "", onUncaughtError = defaultOnUncaughtError, onCaughtError = defaultOnCaughtError, onRecoverableError = defaultOnRecoverableError, transitionCallbacks = null;
  null !== options2 && void 0 !== options2 && (true === options2.unstable_strictMode && (isStrictMode = true), void 0 !== options2.identifierPrefix && (identifierPrefix = options2.identifierPrefix), void 0 !== options2.onUncaughtError && (onUncaughtError = options2.onUncaughtError), void 0 !== options2.onCaughtError && (onCaughtError = options2.onCaughtError), void 0 !== options2.onRecoverableError && (onRecoverableError = options2.onRecoverableError), void 0 !== options2.unstable_transitionCallbacks && (transitionCallbacks = options2.unstable_transitionCallbacks));
  options2 = createFiberRoot(
    container,
    1,
    false,
    null,
    null,
    isStrictMode,
    identifierPrefix,
    onUncaughtError,
    onCaughtError,
    onRecoverableError,
    transitionCallbacks,
    null
  );
  container[internalContainerInstanceKey] = options2.current;
  listenToAllSupportedEvents(
    8 === container.nodeType ? container.parentNode : container
  );
  return new ReactDOMRoot(options2);
};
reactDomClient_production.hydrateRoot = function(container, initialChildren, options2) {
  if (!isValidContainer(container)) throw Error(formatProdErrorMessage(299));
  var isStrictMode = false, identifierPrefix = "", onUncaughtError = defaultOnUncaughtError, onCaughtError = defaultOnCaughtError, onRecoverableError = defaultOnRecoverableError, transitionCallbacks = null, formState = null;
  null !== options2 && void 0 !== options2 && (true === options2.unstable_strictMode && (isStrictMode = true), void 0 !== options2.identifierPrefix && (identifierPrefix = options2.identifierPrefix), void 0 !== options2.onUncaughtError && (onUncaughtError = options2.onUncaughtError), void 0 !== options2.onCaughtError && (onCaughtError = options2.onCaughtError), void 0 !== options2.onRecoverableError && (onRecoverableError = options2.onRecoverableError), void 0 !== options2.unstable_transitionCallbacks && (transitionCallbacks = options2.unstable_transitionCallbacks), void 0 !== options2.formState && (formState = options2.formState));
  initialChildren = createFiberRoot(
    container,
    1,
    true,
    initialChildren,
    null != options2 ? options2 : null,
    isStrictMode,
    identifierPrefix,
    onUncaughtError,
    onCaughtError,
    onRecoverableError,
    transitionCallbacks,
    formState
  );
  initialChildren.context = getContextForSubtree(null);
  options2 = initialChildren.current;
  isStrictMode = requestUpdateLane();
  identifierPrefix = createUpdate(isStrictMode);
  identifierPrefix.callback = null;
  enqueueUpdate(options2, identifierPrefix, isStrictMode);
  initialChildren.current.lanes = isStrictMode;
  markRootUpdated$1(initialChildren, isStrictMode);
  ensureRootIsScheduled(initialChildren);
  container[internalContainerInstanceKey] = initialChildren.current;
  listenToAllSupportedEvents(container);
  return new ReactDOMHydrationRoot(initialChildren);
};
reactDomClient_production.version = "19.0.0";
function checkDCE() {
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ === "undefined" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE !== "function") {
    return;
  }
  try {
    __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(checkDCE);
  } catch (err) {
    console.error(err);
  }
}
{
  checkDCE();
  client.exports = reactDomClient_production;
}
var clientExports = client.exports;
Yup.setLocale({
  mixed: {
    required: "This field is required",
    notType: "Invalid value"
  },
  string: {
    email: "Invalid email address",
    min: "Minimum length is ${min}",
    max: "Maximum length is ${max}"
  },
  number: {
    min: "Minimum value is ${min}",
    max: "Maximum value is ${max}"
  },
  array: {
    min: "At least ${min} items are required",
    max: "No more than ${max} items are allowed"
  }
});
function createElement(args) {
  return args;
}
const Style = {
  margin: {
    none: "0px",
    xs: "0.25rem",
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
    "2xl": "3rem",
    "3xl": "4rem",
    "4xl": "5rem"
  }
};
const Heading = createElement({
  id: "Heading",
  value: "readonly",
  props: Yup.object({
    level: Yup.number().oneOf([1, 2, 3, 4, 5, 6]).required().default(1).label("Size").meta({ description: "Heading level (1-6)" }),
    text: Yup.string().required().default("Heading").label("Text").meta({ description: "Heading text" }),
    marginTop: Yup.string().oneOf(Object.keys(Style.margin)).label("Margin Top").default("none").required(),
    marginBottom: Yup.string().oneOf(Object.keys(Style.margin)).label("Margin Bottom").default("none").required()
  }),
  Component: ({ level, text, marginBottom, marginTop }) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Typography.Title,
      {
        level,
        style: { marginBottom: Style.margin[marginBottom], marginTop: Style.margin[marginTop] },
        children: text
      }
    );
  }
});
const Paragraph = createElement({
  id: "Paragraph",
  value: "readonly",
  props: Yup.object({
    text: Yup.string().required().default("Paragraph").label("Text").meta({ description: "Paragraph text", control: "textarea" }),
    type: Yup.string().oneOf(["default", "secondary", "success", "warning", "danger"]).default("default").nullable().label("Type"),
    marginTop: Yup.string().oneOf(Object.keys(Style.margin)).label("Margin Top").default("none").required(),
    marginBottom: Yup.string().oneOf(Object.keys(Style.margin)).label("Margin Bottom").default("none").required()
  }),
  Component: ({ text, marginTop, marginBottom, type }) => {
    const paragraphType = type === "default" ? void 0 : type;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Typography.Paragraph,
      {
        type: paragraphType ?? void 0,
        style: {
          whiteSpace: "pre-line",
          marginTop: Style.margin[marginTop],
          marginBottom: Style.margin[marginBottom]
        },
        children: text
      }
    );
  }
});
const RadioGroup = createElement({
  id: "RadioGroup",
  title: "Radio Group",
  props: Yup.object({
    title: Yup.string().required().default("Select").label("Title"),
    options: Yup.array().of(Yup.string().required()).required().default(["A", "B", "C"]).label("Options").min(1, "At least one option is required").meta({ description: "Options for the radio group, each option is a string." })
  }),
  Component: ({ name, title, options: options2, required }) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name, label: title, required, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Form.RadioGroup, { options: options2 }) });
  }
});
const CheckboxGroup = createElement({
  id: "CheckboxGroup",
  title: "Checkbox Group",
  props: Yup.object({
    title: Yup.string().default("Checkbox").label("Title").nullable(),
    description: Yup.string().nullable().default(null).label("Description"),
    options: Yup.array().of(Yup.string().required()).required().default(["A", "B", "C"]).label("Options"),
    disabled: Yup.object().nullable().default(null).label("Disabled When").meta({ control: "expression" })
  }),
  Component: ({ title, description, options: options2, name }) => {
    const label = /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: title }),
      description && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Typography.Text, { type: "secondary", style: { fontSize: "0.875rem" }, children: description }) })
    ] });
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name, label, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Form.CheckboxGroup, { options: options2 }) });
  }
});
const Divider = createElement({
  id: "Divider",
  props: Yup.object({
    marginTop: Yup.string().oneOf(Object.keys(Style.margin)).label("Margin Top").default("none").required(),
    marginBottom: Yup.string().oneOf(Object.keys(Style.margin)).label("Margin Bottom").default("none").required()
  }),
  Component: ({ marginBottom, marginTop }) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Divider$1, { style: { marginBottom: Style.margin[marginBottom], marginTop: Style.margin[marginTop] } });
  }
});
const Input = createElement({
  id: "Input",
  props: Yup.object({
    title: Yup.string().required().default("Input").label("Title").meta({ description: "Input field title" }),
    type: Yup.string().oneOf(["input", "textarea"]).default("input").label("Type").required(),
    htmlType: Yup.string().oneOf(["text", "email", "password"]).default("text").label("HTML Type").meta({
      description: "HTML input type.\n\nWhen `email` selected, browser will auto suggest users email.\n\nWhen `password` selected, input will be masked."
    }),
    placeholder: Yup.string().label("Placeholder").nullable(),
    disabled: Yup.bool().nullable().default(null).label("Disabled When").meta({ control: "expression" })
  }),
  Component: ({ title, name, placeholder, type, required, htmlType }) => {
    const [{ value }] = useField(name);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Form.Item, { label: title, name, required, children: [
      type === "textarea" && /* @__PURE__ */ jsxRuntimeExports.jsx(Form.TextArea, { value: value ?? "", placeholder: placeholder ?? void 0 }),
      type === "input" && /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Input, { type: htmlType, placeholder: placeholder ?? void 0 })
    ] });
  }
});
const Select = createElement({
  id: "Select",
  props: Yup.object({
    title: Yup.string().required().default("Select").label("Title"),
    options: Yup.array().of(Yup.string().required()).required().default(["A", "B", "C"]).label("Options"),
    disabled: Yup.bool().nullable().default(null).label("Disabled When").meta({ control: "expression" })
  }),
  Component: ({ title, options: options2, name, disabled, required }) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { label: title, name, required, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Form.Select,
      {
        disabled: disabled ?? void 0,
        options: options2.map((x) => ({ label: x, value: x })),
        allowClear: !required
      }
    ) });
  }
});
const Rate = createElement({
  id: "Rate",
  props: Yup.object({
    title: Yup.string().required().default("Rate").label("Title").meta({ description: "Rate component" }),
    count: Yup.number().required().default(5).label("Count"),
    disabled: Yup.bool().nullable().meta({ control: "expression", description: "Disable when expression is true" })
  }),
  Component: ({ title, name, disabled, count }) => {
    const [{ value }, , { setValue, setTouched }] = useField(name);
    const onChange = (val) => {
      setValue(val);
      setTouched(true);
    };
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { label: title, name, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Rate$1, { disabled: disabled ?? void 0, value, onChange, count, allowClear: true }) });
  }
});
const SubmitButton = createElement({
  id: "SubmitButton",
  title: "Submit Button",
  value: "readonly",
  props: Yup.object({
    type: Yup.string().oneOf(["primary", "default", "dashed", "text", "link"]).required().default("primary").label("Type").meta({ description: "Button type" }),
    text: Yup.string().required().default("Submit").label("Text").meta({ description: "Text of the button" }),
    disabled: Yup.bool().nullable().label("Disabled When").meta({ control: "expression" }),
    align: Yup.string().oneOf(["left", "center", "right"]).required().default("left").label("Align").meta({ description: "Alignment of the button" })
  }),
  Component: ({ text, type, disabled, align }) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { textAlign: align }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Submit, { disabled: disabled ?? void 0, type: type ?? void 0, children: text }) });
  }
});
const ELEMENTS = Object.assign(
  [
    ["Form", Input, Select, RadioGroup, CheckboxGroup, Rate, SubmitButton],
    ["Layout", Heading, Paragraph, Divider]
  ],
  {
    elements() {
      return ELEMENTS.flatMap((x) => x.slice(1));
    }
  }
);
function isRequiredValidationRule(x) {
  return "type" in x && x.type === "required";
}
function validateModelElementId(id) {
  if (!id) return "ID is required";
  if (!/^[a-zA-Z0-9_]+$/.test(id)) return "ID can only contain alphanumeric characters and underscores";
  return void 0;
}
const BINARY_OPERATORS = [
  "=",
  "!=",
  ">",
  "<",
  ">=",
  "<=",
  "contains",
  "not contains",
  "allof",
  "anyof"
];
const CALL_EXPRESSION_FUNCTIONS = ["len"];
const BOOL_OPERATORS = ["and", "or"];
function isExpression(x) {
  return x && typeof x === "object" && "type" in x && (x.type === "ConstantExpression" || x.type === "ReferenceExpression" || x.type === "BinaryExpression" || x.type === "BoolExpression");
}
function exec(expression, values) {
  switch (expression.type) {
    case "ConstantExpression":
      return expression.value;
    case "ReferenceExpression":
      return values[expression.ref];
    case "BinaryExpression": {
      const leftValue = exec(expression.left, values);
      const rightValue = exec(expression.right, values);
      switch (expression.operator) {
        case "=":
          return leftValue === rightValue;
        case "!=":
          return leftValue !== rightValue;
        case ">":
          return leftValue > rightValue;
        case "<":
          return leftValue < rightValue;
        case ">=":
          return leftValue >= rightValue;
        case "<=":
          return leftValue <= rightValue;
        case "contains": {
          if (typeof leftValue === "string" || typeof rightValue === "string") {
            return String(leftValue).includes(String(rightValue));
          }
          return Array.isArray(leftValue) && leftValue.includes(rightValue);
        }
        case "not contains": {
          if (typeof leftValue === "string" || typeof rightValue === "string") {
            return !String(leftValue).includes(String(rightValue));
          }
          return Array.isArray(leftValue) && !leftValue.includes(rightValue);
        }
        default:
          throw new Error(`Unknown binary operator: ${expression.operator}`);
      }
    }
    case "BoolExpression": {
      const results = expression.expressions.map((expr) => exec(expr, values));
      switch (expression.operator) {
        case "and":
          return results.every(Boolean);
        case "or":
          return results.some(Boolean);
        default:
          throw new Error(`Unknown boolean operator: ${expression["operator"]}`);
      }
    }
    case "CallExpression": {
      if (expression.function !== "len") {
        throw new Error(`Unknown function: ${expression.function}`);
      }
      if (expression.args.length !== 1) {
        throw new Error(`Function 'len' expects exactly one argument, got ${expression.args.length}`);
      }
      const argValue = exec(expression.args[0], values);
      if (argValue == null) {
        return 0;
      }
      return Array.isArray(argValue) ? argValue.length : String(argValue).length;
    }
    default:
      throw new Error(`Unknown expression type: ${expression["type"]}`);
  }
}
function visit(expression, visitor) {
  switch (expression.type) {
    case "ConstantExpression":
      return visitor(expression);
    case "ReferenceExpression":
      return visitor(expression);
    case "BinaryExpression": {
      const left = visit(expression.left, visitor);
      const right = visit(expression.right, visitor);
      expression = left !== expression.left || right !== expression.right ? { ...expression, left, right } : expression;
      return visitor(expression);
    }
    case "CallExpression": {
      const args = expression.args.map((arg) => visit(arg, visitor));
      const callExpression = expression;
      expression = args.length !== expression.args.length || args.some((arg, index2) => arg !== callExpression.args[index2]) ? { ...expression, args } : expression;
      return visitor(expression);
    }
    case "BoolExpression": {
      const exp = expression;
      const expressions = expression.expressions.map((expr) => visit(expr, visitor));
      expression = expressions.length != exp.expressions.length || expressions.some((expr, index2) => expr !== exp.expressions[index2]) ? { ...exp, expressions } : exp;
      return visitor(expression);
    }
    default:
      throw new Error(`Unknown expression type: ${expression["type"]}`);
  }
}
const ExpressionUtil = {
  exec,
  isExpression,
  visit
};
function initialValue(model) {
  return model.elements.reduce(
    (acc, x) => {
      acc[x.id] = elementInitialValue(x);
      return acc;
    },
    {}
  );
}
function elementInitialValue(el) {
  return el.defaultValue ?? null;
}
function propsOf(el, values) {
  const props = { ...el.props };
  for (const key in props) {
    if (Object.prototype.hasOwnProperty.call(props, key)) {
      if (ExpressionUtil.isExpression(props[key])) props[key] = ExpressionUtil.exec(props[key], values);
    }
  }
  return props;
}
function schemaOfType(type) {
  if (Array.isArray(type) && type[0] === "arrayOf") {
    return Yup.array(schemaOfType(type[1])).nullable();
  }
  switch (type) {
    case "string":
      return Yup.string().nullable();
    case "number":
      return Yup.number().nullable();
    case "boolean":
      return Yup.boolean().nullable();
    case "date":
      return Yup.date().nullable();
    case "object":
      return Yup.object().nullable();
    default:
      return Yup.string().nullable();
  }
}
function schemaOf(model, Element2) {
  let base = schemaOfType(Element2.value ?? "string");
  let testIndex = -1;
  for (const validation of model.validation ?? []) {
    if (isRequiredValidationRule(validation)) {
      base = validation.message ? base.required(validation.message) : base.required();
    }
    if (validation.type === "test") {
      base = base.test({
        name: `test-${++testIndex}`,
        message: validation.message,
        test: (_, context) => {
          return !ExpressionUtil.exec(validation.test, context.parent);
        }
      });
    }
  }
  return base;
}
const ModelUtil = {
  initialValue,
  elementInitialValue,
  propsOf,
  schemaOf
};
const DesignerUtil = {
  initialValue: (el) => {
    const describe = el.props.describe();
    const props = describe.default ?? {};
    return { props };
  },
  flattenElements: (elements) => {
    return elements.flatMap((x) => Array.isArray(x) ? x.slice(1) : x);
  }
};
function swap(array, index1, index2) {
  if (index1 < 0 || index2 < 0 || index1 >= array.length || index2 >= array.length) {
    throw new Error("Index out of bounds");
  }
  const newArray = [...array];
  [newArray[index1], newArray[index2]] = [newArray[index2], newArray[index1]];
  return newArray;
}
function parsePath(path) {
  const parts = [];
  path.split(".").forEach((part) => {
    const regex = /([^[\]]+)|\[(\d+)\]/g;
    let match;
    while ((match = regex.exec(part)) !== null) {
      if (match[1] !== void 0) {
        parts.push(match[1]);
      } else if (match[2] !== void 0) {
        parts.push(Number(match[2]));
      }
    }
  });
  return parts;
}
function pathToName(path) {
  if (path.length === 0) {
    return null;
  }
  let result = "";
  for (const x of path) {
    if (typeof x === "number") {
      result += `[${x}]`;
    } else {
      if (result.length > 0) {
        result += ".";
      }
      result += x;
    }
  }
  return result;
}
function parseIndex(name) {
  const match = name.match(/\[(\d+)\]$/);
  if (match) {
    return parseInt(match[1], 10);
  }
  return null;
}
const DesignerContext = require$$1.createContext(null);
function usePushElement(props) {
  const { model, set } = props;
  return useCallback(
    (x) => {
      const last = model.elements.filter((el) => el.id.startsWith("el")).slice().sort(
        (a, b) => b.id.length != a.id.length ? b.id.length - a.id.length : b.id.substring(2).localeCompare(a.id.substring(2))
      )[0];
      const nextNumber = last ? +last.id.substring(2) + 1 : 1;
      const id = `el${nextNumber}`;
      set({
        ...model,
        elements: [
          ...model.elements,
          {
            id,
            element: x.id,
            defaultValue: null,
            ...DesignerUtil.initialValue(x),
            validation: null
          }
        ]
      });
      return id;
    },
    [model, set]
  );
}
function useRemoveElement(props) {
  const { model, set } = props;
  return useCallback(
    (el) => {
      set({ ...model, elements: model.elements.filter((x) => x.id !== el.id) });
    },
    [model, set]
  );
}
function useMoveElement(props, value) {
  const { model, set } = props;
  return useCallback(
    (el) => {
      const index2 = model.elements.findIndex((x) => x.id === el.id);
      if (index2 + value < 0 || index2 + value >= model.elements.length) {
        return;
      }
      set({ ...model, elements: swap(model.elements, index2, index2 + value) });
    },
    [model, set, value]
  );
}
function useRenameElement(props) {
  const { set, select, selectedId, model } = props;
  return useCallback(
    (id, newId) => {
      const error = validateModelElementId(newId);
      if (error) {
        throw new Error(error);
      }
      set({
        ...model,
        elements: model.elements.map((x) => {
          if (x.id === id) {
            x = { ...x, id: newId };
          }
          for (const key in x.props) {
            if (Object.prototype.hasOwnProperty.call(x.props, key)) {
              if (ExpressionUtil.isExpression(x.props[key])) {
                x = {
                  ...x,
                  props: {
                    ...x.props,
                    [key]: ExpressionUtil.visit(
                      x.props[key],
                      (node) => node.type === "ReferenceExpression" && node.ref === id ? { ...node, ref: newId } : node
                    )
                  }
                };
              }
            }
          }
          if (x.condition) {
            x = {
              ...x,
              condition: ExpressionUtil.visit(
                x.condition,
                (node) => node.type === "ReferenceExpression" && node.ref === id ? { ...node, ref: newId } : node
              )
            };
          }
          if (x.validation) {
            x = {
              ...x,
              validation: x.validation.map(
                (x2) => x2.type === "test" ? {
                  ...x2,
                  test: ExpressionUtil.visit(
                    x2.test,
                    (node) => node.type === "ReferenceExpression" && node.ref === id ? { ...node, ref: newId } : node
                  )
                } : x2
              )
            };
          }
          return x;
        })
      });
      if (selectedId === id) {
        select(newId);
      }
    },
    [model, set, select, selectedId]
  );
}
function DesignerContextProvider(props) {
  const { children, Elements, model, set, selectedId, select } = props;
  const pushElement = usePushElement(props);
  const removeElement = useRemoveElement(props);
  const moveElementUp = useMoveElement(props, -1);
  const moveElementDown = useMoveElement(props, 1);
  const renameElement = useRenameElement(props);
  const ElementValues = useMemo(
    () => Elements.flatMap((x) => Array.isArray(x) ? x.slice(1) : x),
    [Elements]
  );
  const value = useMemo(
    () => ({
      ElementsInput: Elements,
      Elements: Elements.flatMap((x) => Array.isArray(x) ? x.slice(1) : x),
      model,
      set,
      pushElement,
      removeElement,
      moveElementUp,
      moveElementDown,
      selectedId,
      select,
      selected: model.elements.find((x) => x.id === selectedId) ?? null,
      selectedElement: ElementValues.find((x) => {
        var _a;
        return x.id === ((_a = model.elements.find((el) => el.id === selectedId)) == null ? void 0 : _a.element);
      }) ?? null,
      renameElement
    }),
    [
      Elements,
      ElementValues,
      model,
      set,
      pushElement,
      removeElement,
      moveElementUp,
      moveElementDown,
      select,
      selectedId,
      renameElement
    ]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx(DesignerContext.Provider, { value, children });
}
function useDesignerContext() {
  return useContext(DesignerContext);
}
const DynamicFormTheme = flexy.createTheme("wxd-dynamic-form");
const DynamicFormSettings = {
  clx: "wxd-"
};
function clx(name) {
  return `${DynamicFormSettings.clx}${name}`;
}
const ElementListItemControlBlock = DynamicFormTheme.flexy(
  "ElementListItemControlBlock",
  (props) => {
    const { element } = props;
    const { removeElement, moveElementUp, moveElementDown } = useDesignerContext();
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: clx("element-list-item-control-block"), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { children: element.id }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "link", onClick: () => moveElementUp(element), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowUpOutlined, {}) }, "up"),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          type: "link",
          onClick: () => moveElementDown(element),
          icon: /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowDownOutlined, {})
        },
        "down"
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "link", onClick: () => removeElement(element), icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DeleteOutlined, {}) }, "remove")
    ] });
  }
);
const ElementListItem = DynamicFormTheme.flexy("ElementListItem", (props) => {
  var _a;
  const { element, animate } = props;
  const { Elements, selectedId: selected, select } = useDesignerContext();
  const [isAppearanceAnimationShown, setAppearanceAnimationShown] = useState(animate ?? false);
  const ref = useRef(null);
  const def = Elements.find((x) => x.id === element.element);
  const Element2 = def.Component;
  useLayoutEffect(() => {
    var _a2;
    if (animate) (_a2 = ref.current) == null ? void 0 : _a2.scrollIntoView({ behavior: "smooth", block: "center" });
  }, []);
  useEffect(() => {
    if (animate) setTimeout(() => setAppearanceAnimationShown(false), 500);
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      ref,
      className: classNames(clx("element-list-item"), {
        "--selected": selected === element.id,
        "--appearance-animation-shown": animate && isAppearanceAnimationShown
      }),
      onClick: () => select(element.id),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ElementListItemControlBlock, { element }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ErrorBoundary, { fallback: /* @__PURE__ */ jsxRuntimeExports.jsx(Typography.Text, { type: "danger", children: "Error" }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Element2,
          {
            ...element.props,
            name: element.id,
            disabled: false,
            required: ((_a = element.validation) == null ? void 0 : _a.some(isRequiredValidationRule)) === true
          }
        ) })
      ]
    }
  );
});
const ElementList = DynamicFormTheme.flexy("ElementList", (props) => {
  const { model, select } = useDesignerContext();
  const { animate } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Form$1, { layout: "vertical", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    List,
    {
      dataSource: model.elements,
      renderItem: (el) => {
        return /* @__PURE__ */ jsxRuntimeExports.jsx(List.Item, { onClick: () => select(el.id), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ElementListItem, { element: el, animate }) }, el.id);
      }
    }
  ) });
});
function useMenuItems() {
  const { ElementsInput } = useDesignerContext();
  return useMemo(() => {
    return ElementsInput.map(
      (x) => Array.isArray(x) ? {
        type: "group",
        label: x[0],
        key: x[0],
        children: x.slice(1).map((x2) => ({ key: x2.id, label: x2.title ?? x2.id }))
      } : { key: x.id, label: x.title ?? x.id }
    );
  }, [ElementsInput]);
}
const ElementMenu = DynamicFormTheme.flexy("ElementMenu", (props) => {
  const { offsetTop } = props;
  const { Elements, pushElement } = useDesignerContext();
  const items = useMenuItems();
  const onPush = useCallback(
    (elementBaseId) => {
      const el = Elements.find((x) => x.id === elementBaseId);
      pushElement(el);
    },
    [Elements, pushElement]
  );
  const menu = /* @__PURE__ */ jsxRuntimeExports.jsx(Menu, { className: clx("h-full"), selectable: false, onClick: (e) => onPush(e.key), items });
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: classNames(clx("element-menu"), clx("h-full"), { "--affix": offsetTop != null }), children: [
    offsetTop != null && /* @__PURE__ */ jsxRuntimeExports.jsx(Affix, { className: clx("h-full"), rootClassName: clx("h-full"), offsetTop, children: menu }),
    offsetTop == null && menu
  ] });
});
function isRequired(description) {
  const d = description;
  return d.optional === false && d.nullable === false;
}
function isOneOfDescription(description) {
  return "oneOf" in description;
}
function isArrayOfDescription(description) {
  return "innerType" in description;
}
const SchemaUtil = {
  isRequired,
  isOneOfDescription,
  isArrayOfDescription
};
var QuestionCircleOutlined$5 = { exports: {} };
var QuestionCircleOutlined$4 = {};
var interopRequireWildcard = { exports: {} };
var _typeof$1 = { exports: {} };
(function(module) {
  function _typeof3(o) {
    "@babel/helpers - typeof";
    return module.exports = _typeof3 = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
      return typeof o2;
    } : function(o2) {
      return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports, _typeof3(o);
  }
  module.exports = _typeof3, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(_typeof$1);
var _typeofExports = _typeof$1.exports;
(function(module) {
  var _typeof3 = _typeofExports["default"];
  function _getRequireWildcardCache(e) {
    if ("function" != typeof WeakMap) return null;
    var r = /* @__PURE__ */ new WeakMap(), t = /* @__PURE__ */ new WeakMap();
    return (_getRequireWildcardCache = function _getRequireWildcardCache2(e2) {
      return e2 ? t : r;
    })(e);
  }
  function _interopRequireWildcard2(e, r) {
    if (!r && e && e.__esModule) return e;
    if (null === e || "object" != _typeof3(e) && "function" != typeof e) return {
      "default": e
    };
    var t = _getRequireWildcardCache(r);
    if (t && t.has(e)) return t.get(e);
    var n = {
      __proto__: null
    }, a = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for (var u in e) if ("default" !== u && {}.hasOwnProperty.call(e, u)) {
      var i = a ? Object.getOwnPropertyDescriptor(e, u) : null;
      i && (i.get || i.set) ? Object.defineProperty(n, u, i) : n[u] = e[u];
    }
    return n["default"] = e, t && t.set(e, n), n;
  }
  module.exports = _interopRequireWildcard2, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(interopRequireWildcard);
var interopRequireWildcardExports = interopRequireWildcard.exports;
var interopRequireDefault = { exports: {} };
(function(module) {
  function _interopRequireDefault2(e) {
    return e && e.__esModule ? e : {
      "default": e
    };
  }
  module.exports = _interopRequireDefault2, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(interopRequireDefault);
var interopRequireDefaultExports = interopRequireDefault.exports;
var _extends = { exports: {} };
(function(module) {
  function _extends3() {
    return module.exports = _extends3 = Object.assign ? Object.assign.bind() : function(n) {
      for (var e = 1; e < arguments.length; e++) {
        var t = arguments[e];
        for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
      }
      return n;
    }, module.exports.__esModule = true, module.exports["default"] = module.exports, _extends3.apply(null, arguments);
  }
  module.exports = _extends3, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(_extends);
var _extendsExports = _extends.exports;
var QuestionCircleOutlined$3 = {};
Object.defineProperty(QuestionCircleOutlined$3, "__esModule", { value: true });
var QuestionCircleOutlined$2 = { "icon": { "tag": "svg", "attrs": { "viewBox": "64 64 896 896", "focusable": "false" }, "children": [{ "tag": "path", "attrs": { "d": "M512 64C264.6 64 64 264.6 64 512s200.6 448 448 448 448-200.6 448-448S759.4 64 512 64zm0 820c-205.4 0-372-166.6-372-372s166.6-372 372-372 372 166.6 372 372-166.6 372-372 372z" } }, { "tag": "path", "attrs": { "d": "M623.6 316.7C593.6 290.4 554 276 512 276s-81.6 14.5-111.6 40.7C369.2 344 352 380.7 352 420v7.6c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8V420c0-44.1 43.1-80 96-80s96 35.9 96 80c0 31.1-22 59.6-56.1 72.7-21.2 8.1-39.2 22.3-52.1 40.9-13.1 19-19.9 41.8-19.9 64.9V620c0 4.4 3.6 8 8 8h48c4.4 0 8-3.6 8-8v-22.7a48.3 48.3 0 0130.9-44.8c59-22.7 97.1-74.7 97.1-132.5.1-39.3-17.1-76-48.3-103.3zM472 732a40 40 0 1080 0 40 40 0 10-80 0z" } }] }, "name": "question-circle", "theme": "outlined" };
QuestionCircleOutlined$3.default = QuestionCircleOutlined$2;
var AntdIcon = {};
var slicedToArray = { exports: {} };
var arrayWithHoles = { exports: {} };
(function(module) {
  function _arrayWithHoles(r) {
    if (Array.isArray(r)) return r;
  }
  module.exports = _arrayWithHoles, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(arrayWithHoles);
var arrayWithHolesExports = arrayWithHoles.exports;
var iterableToArrayLimit = { exports: {} };
(function(module) {
  function _iterableToArrayLimit(r, l) {
    var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
    if (null != t) {
      var e, n, i, u, a = [], f = true, o = false;
      try {
        if (i = (t = t.call(r)).next, 0 === l) {
          if (Object(t) !== t) return;
          f = false;
        } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = true) ;
      } catch (r2) {
        o = true, n = r2;
      } finally {
        try {
          if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return;
        } finally {
          if (o) throw n;
        }
      }
      return a;
    }
  }
  module.exports = _iterableToArrayLimit, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(iterableToArrayLimit);
var iterableToArrayLimitExports = iterableToArrayLimit.exports;
var unsupportedIterableToArray = { exports: {} };
var arrayLikeToArray = { exports: {} };
(function(module) {
  function _arrayLikeToArray(r, a) {
    (null == a || a > r.length) && (a = r.length);
    for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
    return n;
  }
  module.exports = _arrayLikeToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(arrayLikeToArray);
var arrayLikeToArrayExports = arrayLikeToArray.exports;
(function(module) {
  var arrayLikeToArray2 = arrayLikeToArrayExports;
  function _unsupportedIterableToArray(r, a) {
    if (r) {
      if ("string" == typeof r) return arrayLikeToArray2(r, a);
      var t = {}.toString.call(r).slice(8, -1);
      return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? arrayLikeToArray2(r, a) : void 0;
    }
  }
  module.exports = _unsupportedIterableToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(unsupportedIterableToArray);
var unsupportedIterableToArrayExports = unsupportedIterableToArray.exports;
var nonIterableRest = { exports: {} };
(function(module) {
  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }
  module.exports = _nonIterableRest, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(nonIterableRest);
var nonIterableRestExports = nonIterableRest.exports;
(function(module) {
  var arrayWithHoles2 = arrayWithHolesExports;
  var iterableToArrayLimit2 = iterableToArrayLimitExports;
  var unsupportedIterableToArray2 = unsupportedIterableToArrayExports;
  var nonIterableRest2 = nonIterableRestExports;
  function _slicedToArray(r, e) {
    return arrayWithHoles2(r) || iterableToArrayLimit2(r, e) || unsupportedIterableToArray2(r, e) || nonIterableRest2();
  }
  module.exports = _slicedToArray, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(slicedToArray);
var slicedToArrayExports = slicedToArray.exports;
var defineProperty = { exports: {} };
var toPropertyKey$1 = { exports: {} };
var toPrimitive$1 = { exports: {} };
(function(module) {
  var _typeof3 = _typeofExports["default"];
  function toPrimitive2(t, r) {
    if ("object" != _typeof3(t) || !t) return t;
    var e = t[Symbol.toPrimitive];
    if (void 0 !== e) {
      var i = e.call(t, r || "default");
      if ("object" != _typeof3(i)) return i;
      throw new TypeError("@@toPrimitive must return a primitive value.");
    }
    return ("string" === r ? String : Number)(t);
  }
  module.exports = toPrimitive2, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(toPrimitive$1);
var toPrimitiveExports = toPrimitive$1.exports;
(function(module) {
  var _typeof3 = _typeofExports["default"];
  var toPrimitive2 = toPrimitiveExports;
  function toPropertyKey2(t) {
    var i = toPrimitive2(t, "string");
    return "symbol" == _typeof3(i) ? i : i + "";
  }
  module.exports = toPropertyKey2, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(toPropertyKey$1);
var toPropertyKeyExports = toPropertyKey$1.exports;
(function(module) {
  var toPropertyKey2 = toPropertyKeyExports;
  function _defineProperty3(e, r, t) {
    return (r = toPropertyKey2(r)) in e ? Object.defineProperty(e, r, {
      value: t,
      enumerable: true,
      configurable: true,
      writable: true
    }) : e[r] = t, e;
  }
  module.exports = _defineProperty3, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(defineProperty);
var definePropertyExports = defineProperty.exports;
var objectWithoutProperties = { exports: {} };
var objectWithoutPropertiesLoose = { exports: {} };
(function(module) {
  function _objectWithoutPropertiesLoose(r, e) {
    if (null == r) return {};
    var t = {};
    for (var n in r) if ({}.hasOwnProperty.call(r, n)) {
      if (-1 !== e.indexOf(n)) continue;
      t[n] = r[n];
    }
    return t;
  }
  module.exports = _objectWithoutPropertiesLoose, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(objectWithoutPropertiesLoose);
var objectWithoutPropertiesLooseExports = objectWithoutPropertiesLoose.exports;
(function(module) {
  var objectWithoutPropertiesLoose2 = objectWithoutPropertiesLooseExports;
  function _objectWithoutProperties(e, t) {
    if (null == e) return {};
    var o, r, i = objectWithoutPropertiesLoose2(e, t);
    if (Object.getOwnPropertySymbols) {
      var n = Object.getOwnPropertySymbols(e);
      for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]);
    }
    return i;
  }
  module.exports = _objectWithoutProperties, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(objectWithoutProperties);
var objectWithoutPropertiesExports = objectWithoutProperties.exports;
function _typeof(o) {
  "@babel/helpers - typeof";
  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o2) {
    return typeof o2;
  } : function(o2) {
    return o2 && "function" == typeof Symbol && o2.constructor === Symbol && o2 !== Symbol.prototype ? "symbol" : typeof o2;
  }, _typeof(o);
}
function toPrimitive(t, r) {
  if ("object" != _typeof(t) || !t) return t;
  var e = t[Symbol.toPrimitive];
  if (void 0 !== e) {
    var i = e.call(t, r);
    if ("object" != _typeof(i)) return i;
    throw new TypeError("@@toPrimitive must return a primitive value.");
  }
  return ("string" === r ? String : Number)(t);
}
function toPropertyKey(t) {
  var i = toPrimitive(t, "string");
  return "symbol" == _typeof(i) ? i : i + "";
}
function _defineProperty(e, r, t) {
  return (r = toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
    value: t,
    enumerable: true,
    configurable: true,
    writable: true
  }) : e[r] = t, e;
}
const round = Math.round;
function splitColorStr(str, parseNum) {
  const match = str.replace(/^[^(]*\((.*)/, "$1").replace(/\).*/, "").match(/\d*\.?\d+%?/g) || [];
  const numList = match.map((item) => parseFloat(item));
  for (let i = 0; i < 3; i += 1) {
    numList[i] = parseNum(numList[i] || 0, match[i] || "", i);
  }
  if (match[3]) {
    numList[3] = match[3].includes("%") ? numList[3] / 100 : numList[3];
  } else {
    numList[3] = 1;
  }
  return numList;
}
const parseHSVorHSL = (num, _, index2) => index2 === 0 ? num : num / 100;
function limitRange(value, max) {
  const mergedMax = max || 255;
  if (value > mergedMax) {
    return mergedMax;
  }
  if (value < 0) {
    return 0;
  }
  return value;
}
class FastColor {
  constructor(input) {
    _defineProperty(this, "isValid", true);
    _defineProperty(this, "r", 0);
    _defineProperty(this, "g", 0);
    _defineProperty(this, "b", 0);
    _defineProperty(this, "a", 1);
    _defineProperty(this, "_h", void 0);
    _defineProperty(this, "_s", void 0);
    _defineProperty(this, "_l", void 0);
    _defineProperty(this, "_v", void 0);
    _defineProperty(this, "_max", void 0);
    _defineProperty(this, "_min", void 0);
    _defineProperty(this, "_brightness", void 0);
    function matchFormat(str) {
      return str[0] in input && str[1] in input && str[2] in input;
    }
    if (!input) ;
    else if (typeof input === "string") {
      let matchPrefix = function(prefix2) {
        return trimStr.startsWith(prefix2);
      };
      const trimStr = input.trim();
      if (/^#?[A-F\d]{3,8}$/i.test(trimStr)) {
        this.fromHexString(trimStr);
      } else if (matchPrefix("rgb")) {
        this.fromRgbString(trimStr);
      } else if (matchPrefix("hsl")) {
        this.fromHslString(trimStr);
      } else if (matchPrefix("hsv") || matchPrefix("hsb")) {
        this.fromHsvString(trimStr);
      }
    } else if (input instanceof FastColor) {
      this.r = input.r;
      this.g = input.g;
      this.b = input.b;
      this.a = input.a;
      this._h = input._h;
      this._s = input._s;
      this._l = input._l;
      this._v = input._v;
    } else if (matchFormat("rgb")) {
      this.r = limitRange(input.r);
      this.g = limitRange(input.g);
      this.b = limitRange(input.b);
      this.a = typeof input.a === "number" ? limitRange(input.a, 1) : 1;
    } else if (matchFormat("hsl")) {
      this.fromHsl(input);
    } else if (matchFormat("hsv")) {
      this.fromHsv(input);
    } else {
      throw new Error("@ant-design/fast-color: unsupported input " + JSON.stringify(input));
    }
  }
  // ======================= Setter =======================
  setR(value) {
    return this._sc("r", value);
  }
  setG(value) {
    return this._sc("g", value);
  }
  setB(value) {
    return this._sc("b", value);
  }
  setA(value) {
    return this._sc("a", value, 1);
  }
  setHue(value) {
    const hsv = this.toHsv();
    hsv.h = value;
    return this._c(hsv);
  }
  // ======================= Getter =======================
  /**
   * Returns the perceived luminance of a color, from 0-1.
   * @see http://www.w3.org/TR/2008/REC-WCAG20-20081211/#relativeluminancedef
   */
  getLuminance() {
    function adjustGamma(raw) {
      const val = raw / 255;
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4);
    }
    const R = adjustGamma(this.r);
    const G = adjustGamma(this.g);
    const B = adjustGamma(this.b);
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  }
  getHue() {
    if (typeof this._h === "undefined") {
      const delta = this.getMax() - this.getMin();
      if (delta === 0) {
        this._h = 0;
      } else {
        this._h = round(60 * (this.r === this.getMax() ? (this.g - this.b) / delta + (this.g < this.b ? 6 : 0) : this.g === this.getMax() ? (this.b - this.r) / delta + 2 : (this.r - this.g) / delta + 4));
      }
    }
    return this._h;
  }
  getSaturation() {
    if (typeof this._s === "undefined") {
      const delta = this.getMax() - this.getMin();
      if (delta === 0) {
        this._s = 0;
      } else {
        this._s = delta / this.getMax();
      }
    }
    return this._s;
  }
  getLightness() {
    if (typeof this._l === "undefined") {
      this._l = (this.getMax() + this.getMin()) / 510;
    }
    return this._l;
  }
  getValue() {
    if (typeof this._v === "undefined") {
      this._v = this.getMax() / 255;
    }
    return this._v;
  }
  /**
   * Returns the perceived brightness of the color, from 0-255.
   * Note: this is not the b of HSB
   * @see http://www.w3.org/TR/AERT#color-contrast
   */
  getBrightness() {
    if (typeof this._brightness === "undefined") {
      this._brightness = (this.r * 299 + this.g * 587 + this.b * 114) / 1e3;
    }
    return this._brightness;
  }
  // ======================== Func ========================
  darken(amount = 10) {
    const h = this.getHue();
    const s = this.getSaturation();
    let l = this.getLightness() - amount / 100;
    if (l < 0) {
      l = 0;
    }
    return this._c({
      h,
      s,
      l,
      a: this.a
    });
  }
  lighten(amount = 10) {
    const h = this.getHue();
    const s = this.getSaturation();
    let l = this.getLightness() + amount / 100;
    if (l > 1) {
      l = 1;
    }
    return this._c({
      h,
      s,
      l,
      a: this.a
    });
  }
  /**
   * Mix the current color a given amount with another color, from 0 to 100.
   * 0 means no mixing (return current color).
   */
  mix(input, amount = 50) {
    const color = this._c(input);
    const p = amount / 100;
    const calc = (key) => (color[key] - this[key]) * p + this[key];
    const rgba = {
      r: round(calc("r")),
      g: round(calc("g")),
      b: round(calc("b")),
      a: round(calc("a") * 100) / 100
    };
    return this._c(rgba);
  }
  /**
   * Mix the color with pure white, from 0 to 100.
   * Providing 0 will do nothing, providing 100 will always return white.
   */
  tint(amount = 10) {
    return this.mix({
      r: 255,
      g: 255,
      b: 255,
      a: 1
    }, amount);
  }
  /**
   * Mix the color with pure black, from 0 to 100.
   * Providing 0 will do nothing, providing 100 will always return black.
   */
  shade(amount = 10) {
    return this.mix({
      r: 0,
      g: 0,
      b: 0,
      a: 1
    }, amount);
  }
  onBackground(background) {
    const bg = this._c(background);
    const alpha = this.a + bg.a * (1 - this.a);
    const calc = (key) => {
      return round((this[key] * this.a + bg[key] * bg.a * (1 - this.a)) / alpha);
    };
    return this._c({
      r: calc("r"),
      g: calc("g"),
      b: calc("b"),
      a: alpha
    });
  }
  // ======================= Status =======================
  isDark() {
    return this.getBrightness() < 128;
  }
  isLight() {
    return this.getBrightness() >= 128;
  }
  // ======================== MISC ========================
  equals(other) {
    return this.r === other.r && this.g === other.g && this.b === other.b && this.a === other.a;
  }
  clone() {
    return this._c(this);
  }
  // ======================= Format =======================
  toHexString() {
    let hex = "#";
    const rHex = (this.r || 0).toString(16);
    hex += rHex.length === 2 ? rHex : "0" + rHex;
    const gHex = (this.g || 0).toString(16);
    hex += gHex.length === 2 ? gHex : "0" + gHex;
    const bHex = (this.b || 0).toString(16);
    hex += bHex.length === 2 ? bHex : "0" + bHex;
    if (typeof this.a === "number" && this.a >= 0 && this.a < 1) {
      const aHex = round(this.a * 255).toString(16);
      hex += aHex.length === 2 ? aHex : "0" + aHex;
    }
    return hex;
  }
  /** CSS support color pattern */
  toHsl() {
    return {
      h: this.getHue(),
      s: this.getSaturation(),
      l: this.getLightness(),
      a: this.a
    };
  }
  /** CSS support color pattern */
  toHslString() {
    const h = this.getHue();
    const s = round(this.getSaturation() * 100);
    const l = round(this.getLightness() * 100);
    return this.a !== 1 ? `hsla(${h},${s}%,${l}%,${this.a})` : `hsl(${h},${s}%,${l}%)`;
  }
  /** Same as toHsb */
  toHsv() {
    return {
      h: this.getHue(),
      s: this.getSaturation(),
      v: this.getValue(),
      a: this.a
    };
  }
  toRgb() {
    return {
      r: this.r,
      g: this.g,
      b: this.b,
      a: this.a
    };
  }
  toRgbString() {
    return this.a !== 1 ? `rgba(${this.r},${this.g},${this.b},${this.a})` : `rgb(${this.r},${this.g},${this.b})`;
  }
  toString() {
    return this.toRgbString();
  }
  // ====================== Privates ======================
  /** Return a new FastColor object with one channel changed */
  _sc(rgb, value, max) {
    const clone = this.clone();
    clone[rgb] = limitRange(value, max);
    return clone;
  }
  _c(input) {
    return new this.constructor(input);
  }
  getMax() {
    if (typeof this._max === "undefined") {
      this._max = Math.max(this.r, this.g, this.b);
    }
    return this._max;
  }
  getMin() {
    if (typeof this._min === "undefined") {
      this._min = Math.min(this.r, this.g, this.b);
    }
    return this._min;
  }
  fromHexString(trimStr) {
    const withoutPrefix = trimStr.replace("#", "");
    function connectNum(index1, index2) {
      return parseInt(withoutPrefix[index1] + withoutPrefix[index2 || index1], 16);
    }
    if (withoutPrefix.length < 6) {
      this.r = connectNum(0);
      this.g = connectNum(1);
      this.b = connectNum(2);
      this.a = withoutPrefix[3] ? connectNum(3) / 255 : 1;
    } else {
      this.r = connectNum(0, 1);
      this.g = connectNum(2, 3);
      this.b = connectNum(4, 5);
      this.a = withoutPrefix[6] ? connectNum(6, 7) / 255 : 1;
    }
  }
  fromHsl({
    h,
    s,
    l,
    a
  }) {
    this._h = h % 360;
    this._s = s;
    this._l = l;
    this.a = typeof a === "number" ? a : 1;
    if (s <= 0) {
      const rgb = round(l * 255);
      this.r = rgb;
      this.g = rgb;
      this.b = rgb;
    }
    let r = 0, g = 0, b = 0;
    const huePrime = h / 60;
    const chroma = (1 - Math.abs(2 * l - 1)) * s;
    const secondComponent = chroma * (1 - Math.abs(huePrime % 2 - 1));
    if (huePrime >= 0 && huePrime < 1) {
      r = chroma;
      g = secondComponent;
    } else if (huePrime >= 1 && huePrime < 2) {
      r = secondComponent;
      g = chroma;
    } else if (huePrime >= 2 && huePrime < 3) {
      g = chroma;
      b = secondComponent;
    } else if (huePrime >= 3 && huePrime < 4) {
      g = secondComponent;
      b = chroma;
    } else if (huePrime >= 4 && huePrime < 5) {
      r = secondComponent;
      b = chroma;
    } else if (huePrime >= 5 && huePrime < 6) {
      r = chroma;
      b = secondComponent;
    }
    const lightnessModification = l - chroma / 2;
    this.r = round((r + lightnessModification) * 255);
    this.g = round((g + lightnessModification) * 255);
    this.b = round((b + lightnessModification) * 255);
  }
  fromHsv({
    h,
    s,
    v,
    a
  }) {
    this._h = h % 360;
    this._s = s;
    this._v = v;
    this.a = typeof a === "number" ? a : 1;
    const vv = round(v * 255);
    this.r = vv;
    this.g = vv;
    this.b = vv;
    if (s <= 0) {
      return;
    }
    const hh = h / 60;
    const i = Math.floor(hh);
    const ff = hh - i;
    const p = round(v * (1 - s) * 255);
    const q = round(v * (1 - s * ff) * 255);
    const t = round(v * (1 - s * (1 - ff)) * 255);
    switch (i) {
      case 0:
        this.g = t;
        this.b = p;
        break;
      case 1:
        this.r = q;
        this.b = p;
        break;
      case 2:
        this.r = p;
        this.b = t;
        break;
      case 3:
        this.r = p;
        this.g = q;
        break;
      case 4:
        this.r = t;
        this.g = p;
        break;
      case 5:
      default:
        this.g = p;
        this.b = q;
        break;
    }
  }
  fromHsvString(trimStr) {
    const cells = splitColorStr(trimStr, parseHSVorHSL);
    this.fromHsv({
      h: cells[0],
      s: cells[1],
      v: cells[2],
      a: cells[3]
    });
  }
  fromHslString(trimStr) {
    const cells = splitColorStr(trimStr, parseHSVorHSL);
    this.fromHsl({
      h: cells[0],
      s: cells[1],
      l: cells[2],
      a: cells[3]
    });
  }
  fromRgbString(trimStr) {
    const cells = splitColorStr(trimStr, (num, txt) => (
      // Convert percentage to number. e.g. 50% -> 128
      txt.includes("%") ? round(num / 100 * 255) : num
    ));
    this.r = cells[0];
    this.g = cells[1];
    this.b = cells[2];
    this.a = cells[3];
  }
}
var hueStep = 2;
var saturationStep = 0.16;
var saturationStep2 = 0.05;
var brightnessStep1 = 0.05;
var brightnessStep2 = 0.15;
var lightColorCount = 5;
var darkColorCount = 4;
var darkColorMap = [{
  index: 7,
  amount: 15
}, {
  index: 6,
  amount: 25
}, {
  index: 5,
  amount: 30
}, {
  index: 5,
  amount: 45
}, {
  index: 5,
  amount: 65
}, {
  index: 5,
  amount: 85
}, {
  index: 4,
  amount: 90
}, {
  index: 3,
  amount: 95
}, {
  index: 2,
  amount: 97
}, {
  index: 1,
  amount: 98
}];
function getHue(hsv, i, light) {
  var hue;
  if (Math.round(hsv.h) >= 60 && Math.round(hsv.h) <= 240) {
    hue = light ? Math.round(hsv.h) - hueStep * i : Math.round(hsv.h) + hueStep * i;
  } else {
    hue = light ? Math.round(hsv.h) + hueStep * i : Math.round(hsv.h) - hueStep * i;
  }
  if (hue < 0) {
    hue += 360;
  } else if (hue >= 360) {
    hue -= 360;
  }
  return hue;
}
function getSaturation(hsv, i, light) {
  if (hsv.h === 0 && hsv.s === 0) {
    return hsv.s;
  }
  var saturation;
  if (light) {
    saturation = hsv.s - saturationStep * i;
  } else if (i === darkColorCount) {
    saturation = hsv.s + saturationStep;
  } else {
    saturation = hsv.s + saturationStep2 * i;
  }
  if (saturation > 1) {
    saturation = 1;
  }
  if (light && i === lightColorCount && saturation > 0.1) {
    saturation = 0.1;
  }
  if (saturation < 0.06) {
    saturation = 0.06;
  }
  return Math.round(saturation * 100) / 100;
}
function getValue(hsv, i, light) {
  var value;
  if (light) {
    value = hsv.v + brightnessStep1 * i;
  } else {
    value = hsv.v - brightnessStep2 * i;
  }
  value = Math.max(0, Math.min(1, value));
  return Math.round(value * 100) / 100;
}
function generate$1(color) {
  var opts = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var patterns = [];
  var pColor = new FastColor(color);
  var hsv = pColor.toHsv();
  for (var i = lightColorCount; i > 0; i -= 1) {
    var c = new FastColor({
      h: getHue(hsv, i, true),
      s: getSaturation(hsv, i, true),
      v: getValue(hsv, i, true)
    });
    patterns.push(c);
  }
  patterns.push(pColor);
  for (var _i = 1; _i <= darkColorCount; _i += 1) {
    var _c = new FastColor({
      h: getHue(hsv, _i),
      s: getSaturation(hsv, _i),
      v: getValue(hsv, _i)
    });
    patterns.push(_c);
  }
  if (opts.theme === "dark") {
    return darkColorMap.map(function(_ref) {
      var index2 = _ref.index, amount = _ref.amount;
      return new FastColor(opts.backgroundColor || "#141414").mix(patterns[index2], amount).toHexString();
    });
  }
  return patterns.map(function(c2) {
    return c2.toHexString();
  });
}
var presetPrimaryColors = {
  "red": "#F5222D",
  "volcano": "#FA541C",
  "orange": "#FA8C16",
  "gold": "#FAAD14",
  "yellow": "#FADB14",
  "lime": "#A0D911",
  "green": "#52C41A",
  "cyan": "#13C2C2",
  "blue": "#1677FF",
  "geekblue": "#2F54EB",
  "purple": "#722ED1",
  "magenta": "#EB2F96",
  "grey": "#666666"
};
var red = ["#fff1f0", "#ffccc7", "#ffa39e", "#ff7875", "#ff4d4f", "#f5222d", "#cf1322", "#a8071a", "#820014", "#5c0011"];
red.primary = red[5];
var volcano = ["#fff2e8", "#ffd8bf", "#ffbb96", "#ff9c6e", "#ff7a45", "#fa541c", "#d4380d", "#ad2102", "#871400", "#610b00"];
volcano.primary = volcano[5];
var orange = ["#fff7e6", "#ffe7ba", "#ffd591", "#ffc069", "#ffa940", "#fa8c16", "#d46b08", "#ad4e00", "#873800", "#612500"];
orange.primary = orange[5];
var gold = ["#fffbe6", "#fff1b8", "#ffe58f", "#ffd666", "#ffc53d", "#faad14", "#d48806", "#ad6800", "#874d00", "#613400"];
gold.primary = gold[5];
var yellow = ["#feffe6", "#ffffb8", "#fffb8f", "#fff566", "#ffec3d", "#fadb14", "#d4b106", "#ad8b00", "#876800", "#614700"];
yellow.primary = yellow[5];
var lime = ["#fcffe6", "#f4ffb8", "#eaff8f", "#d3f261", "#bae637", "#a0d911", "#7cb305", "#5b8c00", "#3f6600", "#254000"];
lime.primary = lime[5];
var green = ["#f6ffed", "#d9f7be", "#b7eb8f", "#95de64", "#73d13d", "#52c41a", "#389e0d", "#237804", "#135200", "#092b00"];
green.primary = green[5];
var cyan = ["#e6fffb", "#b5f5ec", "#87e8de", "#5cdbd3", "#36cfc9", "#13c2c2", "#08979c", "#006d75", "#00474f", "#002329"];
cyan.primary = cyan[5];
var blue = ["#e6f4ff", "#bae0ff", "#91caff", "#69b1ff", "#4096ff", "#1677ff", "#0958d9", "#003eb3", "#002c8c", "#001d66"];
blue.primary = blue[5];
var geekblue = ["#f0f5ff", "#d6e4ff", "#adc6ff", "#85a5ff", "#597ef7", "#2f54eb", "#1d39c4", "#10239e", "#061178", "#030852"];
geekblue.primary = geekblue[5];
var purple = ["#f9f0ff", "#efdbff", "#d3adf7", "#b37feb", "#9254de", "#722ed1", "#531dab", "#391085", "#22075e", "#120338"];
purple.primary = purple[5];
var magenta = ["#fff0f6", "#ffd6e7", "#ffadd2", "#ff85c0", "#f759ab", "#eb2f96", "#c41d7f", "#9e1068", "#780650", "#520339"];
magenta.primary = magenta[5];
var grey = ["#a6a6a6", "#999999", "#8c8c8c", "#808080", "#737373", "#666666", "#404040", "#1a1a1a", "#000000", "#000000"];
grey.primary = grey[5];
var gray = grey;
var presetPalettes = {
  red,
  volcano,
  orange,
  gold,
  yellow,
  lime,
  green,
  cyan,
  blue,
  geekblue,
  purple,
  magenta,
  grey
};
var redDark = ["#2a1215", "#431418", "#58181c", "#791a1f", "#a61d24", "#d32029", "#e84749", "#f37370", "#f89f9a", "#fac8c3"];
redDark.primary = redDark[5];
var volcanoDark = ["#2b1611", "#441d12", "#592716", "#7c3118", "#aa3e19", "#d84a1b", "#e87040", "#f3956a", "#f8b692", "#fad4bc"];
volcanoDark.primary = volcanoDark[5];
var orangeDark = ["#2b1d11", "#442a11", "#593815", "#7c4a15", "#aa6215", "#d87a16", "#e89a3c", "#f3b765", "#f8cf8d", "#fae3b7"];
orangeDark.primary = orangeDark[5];
var goldDark = ["#2b2111", "#443111", "#594214", "#7c5914", "#aa7714", "#d89614", "#e8b339", "#f3cc62", "#f8df8b", "#faedb5"];
goldDark.primary = goldDark[5];
var yellowDark = ["#2b2611", "#443b11", "#595014", "#7c6e14", "#aa9514", "#d8bd14", "#e8d639", "#f3ea62", "#f8f48b", "#fafab5"];
yellowDark.primary = yellowDark[5];
var limeDark = ["#1f2611", "#2e3c10", "#3e4f13", "#536d13", "#6f9412", "#8bbb11", "#a9d134", "#c9e75d", "#e4f88b", "#f0fab5"];
limeDark.primary = limeDark[5];
var greenDark = ["#162312", "#1d3712", "#274916", "#306317", "#3c8618", "#49aa19", "#6abe39", "#8fd460", "#b2e58b", "#d5f2bb"];
greenDark.primary = greenDark[5];
var cyanDark = ["#112123", "#113536", "#144848", "#146262", "#138585", "#13a8a8", "#33bcb7", "#58d1c9", "#84e2d8", "#b2f1e8"];
cyanDark.primary = cyanDark[5];
var blueDark = ["#111a2c", "#112545", "#15325b", "#15417e", "#1554ad", "#1668dc", "#3c89e8", "#65a9f3", "#8dc5f8", "#b7dcfa"];
blueDark.primary = blueDark[5];
var geekblueDark = ["#131629", "#161d40", "#1c2755", "#203175", "#263ea0", "#2b4acb", "#5273e0", "#7f9ef3", "#a8c1f8", "#d2e0fa"];
geekblueDark.primary = geekblueDark[5];
var purpleDark = ["#1a1325", "#24163a", "#301c4d", "#3e2069", "#51258f", "#642ab5", "#854eca", "#ab7ae0", "#cda8f0", "#ebd7fa"];
purpleDark.primary = purpleDark[5];
var magentaDark = ["#291321", "#40162f", "#551c3b", "#75204f", "#a02669", "#cb2b83", "#e0529c", "#f37fb7", "#f8a8cc", "#fad2e3"];
magentaDark.primary = magentaDark[5];
var greyDark = ["#151515", "#1f1f1f", "#2d2d2d", "#393939", "#494949", "#5a5a5a", "#6a6a6a", "#7b7b7b", "#888888", "#969696"];
greyDark.primary = greyDark[5];
var presetDarkPalettes = {
  red: redDark,
  volcano: volcanoDark,
  orange: orangeDark,
  gold: goldDark,
  yellow: yellowDark,
  lime: limeDark,
  green: greenDark,
  cyan: cyanDark,
  blue: blueDark,
  geekblue: geekblueDark,
  purple: purpleDark,
  magenta: magentaDark,
  grey: greyDark
};
const es = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  blue,
  blueDark,
  cyan,
  cyanDark,
  geekblue,
  geekblueDark,
  generate: generate$1,
  gold,
  goldDark,
  gray,
  green,
  greenDark,
  grey,
  greyDark,
  lime,
  limeDark,
  magenta,
  magentaDark,
  orange,
  orangeDark,
  presetDarkPalettes,
  presetPalettes,
  presetPrimaryColors,
  purple,
  purpleDark,
  red,
  redDark,
  volcano,
  volcanoDark,
  yellow,
  yellowDark
}, Symbol.toStringTag, { value: "Module" }));
const require$$8 = /* @__PURE__ */ getAugmentedNamespace(es);
var Context = {};
Object.defineProperty(Context, "__esModule", {
  value: true
});
Context.default = void 0;
var _react$1 = require$$1;
var IconContext = /* @__PURE__ */ (0, _react$1.createContext)({});
Context.default = IconContext;
var IconBase$1 = {};
var objectSpread2 = { exports: {} };
(function(module) {
  var defineProperty2 = definePropertyExports;
  function ownKeys(e, r) {
    var t = Object.keys(e);
    if (Object.getOwnPropertySymbols) {
      var o = Object.getOwnPropertySymbols(e);
      r && (o = o.filter(function(r2) {
        return Object.getOwnPropertyDescriptor(e, r2).enumerable;
      })), t.push.apply(t, o);
    }
    return t;
  }
  function _objectSpread22(e) {
    for (var r = 1; r < arguments.length; r++) {
      var t = null != arguments[r] ? arguments[r] : {};
      r % 2 ? ownKeys(Object(t), true).forEach(function(r2) {
        defineProperty2(e, r2, t[r2]);
      }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r2) {
        Object.defineProperty(e, r2, Object.getOwnPropertyDescriptor(t, r2));
      });
    }
    return e;
  }
  module.exports = _objectSpread22, module.exports.__esModule = true, module.exports["default"] = module.exports;
})(objectSpread2);
var objectSpread2Exports = objectSpread2.exports;
var utils = {};
var dynamicCSS = {};
var canUseDom$1 = {};
Object.defineProperty(canUseDom$1, "__esModule", {
  value: true
});
canUseDom$1.default = canUseDom;
function canUseDom() {
  return !!(typeof window !== "undefined" && window.document && window.document.createElement);
}
var contains$1 = {};
Object.defineProperty(contains$1, "__esModule", {
  value: true
});
contains$1.default = contains;
function contains(root2, n) {
  if (!root2) {
    return false;
  }
  if (root2.contains) {
    return root2.contains(n);
  }
  var node = n;
  while (node) {
    if (node === root2) {
      return true;
    }
    node = node.parentNode;
  }
  return false;
}
var _interopRequireDefault$5 = interopRequireDefaultExports.default;
Object.defineProperty(dynamicCSS, "__esModule", {
  value: true
});
dynamicCSS.clearContainerCache = clearContainerCache;
dynamicCSS.injectCSS = injectCSS;
dynamicCSS.removeCSS = removeCSS;
dynamicCSS.updateCSS = updateCSS;
var _objectSpread2$2 = _interopRequireDefault$5(objectSpread2Exports);
var _canUseDom = _interopRequireDefault$5(canUseDom$1);
var _contains = _interopRequireDefault$5(contains$1);
var APPEND_ORDER = "data-rc-order";
var APPEND_PRIORITY = "data-rc-priority";
var MARK_KEY = "rc-util-key";
var containerCache = /* @__PURE__ */ new Map();
function getMark() {
  var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {}, mark = _ref.mark;
  if (mark) {
    return mark.startsWith("data-") ? mark : "data-".concat(mark);
  }
  return MARK_KEY;
}
function getContainer(option) {
  if (option.attachTo) {
    return option.attachTo;
  }
  var head = document.querySelector("head");
  return head || document.body;
}
function getOrder(prepend) {
  if (prepend === "queue") {
    return "prependQueue";
  }
  return prepend ? "prepend" : "append";
}
function findStyles(container) {
  return Array.from((containerCache.get(container) || container).children).filter(function(node) {
    return node.tagName === "STYLE";
  });
}
function injectCSS(css) {
  var option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  if (!(0, _canUseDom.default)()) {
    return null;
  }
  var csp = option.csp, prepend = option.prepend, _option$priority = option.priority, priority = _option$priority === void 0 ? 0 : _option$priority;
  var mergedOrder = getOrder(prepend);
  var isPrependQueue = mergedOrder === "prependQueue";
  var styleNode = document.createElement("style");
  styleNode.setAttribute(APPEND_ORDER, mergedOrder);
  if (isPrependQueue && priority) {
    styleNode.setAttribute(APPEND_PRIORITY, "".concat(priority));
  }
  if (csp !== null && csp !== void 0 && csp.nonce) {
    styleNode.nonce = csp === null || csp === void 0 ? void 0 : csp.nonce;
  }
  styleNode.innerHTML = css;
  var container = getContainer(option);
  var firstChild = container.firstChild;
  if (prepend) {
    if (isPrependQueue) {
      var existStyle = (option.styles || findStyles(container)).filter(function(node) {
        if (!["prepend", "prependQueue"].includes(node.getAttribute(APPEND_ORDER))) {
          return false;
        }
        var nodePriority = Number(node.getAttribute(APPEND_PRIORITY) || 0);
        return priority >= nodePriority;
      });
      if (existStyle.length) {
        container.insertBefore(styleNode, existStyle[existStyle.length - 1].nextSibling);
        return styleNode;
      }
    }
    container.insertBefore(styleNode, firstChild);
  } else {
    container.appendChild(styleNode);
  }
  return styleNode;
}
function findExistNode(key) {
  var option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var container = getContainer(option);
  return (option.styles || findStyles(container)).find(function(node) {
    return node.getAttribute(getMark(option)) === key;
  });
}
function removeCSS(key) {
  var option = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : {};
  var existNode = findExistNode(key, option);
  if (existNode) {
    var container = getContainer(option);
    container.removeChild(existNode);
  }
}
function syncRealContainer(container, option) {
  var cachedRealContainer = containerCache.get(container);
  if (!cachedRealContainer || !(0, _contains.default)(document, cachedRealContainer)) {
    var placeholderStyle = injectCSS("", option);
    var parentNode = placeholderStyle.parentNode;
    containerCache.set(container, parentNode);
    container.removeChild(placeholderStyle);
  }
}
function clearContainerCache() {
  containerCache.clear();
}
function updateCSS(css, key) {
  var originOption = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {};
  var container = getContainer(originOption);
  var styles = findStyles(container);
  var option = (0, _objectSpread2$2.default)((0, _objectSpread2$2.default)({}, originOption), {}, {
    styles
  });
  syncRealContainer(container, option);
  var existNode = findExistNode(key, option);
  if (existNode) {
    var _option$csp, _option$csp2;
    if ((_option$csp = option.csp) !== null && _option$csp !== void 0 && _option$csp.nonce && existNode.nonce !== ((_option$csp2 = option.csp) === null || _option$csp2 === void 0 ? void 0 : _option$csp2.nonce)) {
      var _option$csp3;
      existNode.nonce = (_option$csp3 = option.csp) === null || _option$csp3 === void 0 ? void 0 : _option$csp3.nonce;
    }
    if (existNode.innerHTML !== css) {
      existNode.innerHTML = css;
    }
    return existNode;
  }
  var newNode = injectCSS(css, option);
  newNode.setAttribute(getMark(option), key);
  return newNode;
}
var shadow = {};
Object.defineProperty(shadow, "__esModule", {
  value: true
});
shadow.getShadowRoot = getShadowRoot;
shadow.inShadow = inShadow;
function getRoot(ele) {
  var _ele$getRootNode;
  return ele === null || ele === void 0 || (_ele$getRootNode = ele.getRootNode) === null || _ele$getRootNode === void 0 ? void 0 : _ele$getRootNode.call(ele);
}
function inShadow(ele) {
  return getRoot(ele) instanceof ShadowRoot;
}
function getShadowRoot(ele) {
  return inShadow(ele) ? getRoot(ele) : null;
}
var warning$2 = {};
Object.defineProperty(warning$2, "__esModule", {
  value: true
});
warning$2.call = call;
warning$2.default = void 0;
warning$2.note = note;
warning$2.noteOnce = noteOnce;
warning$2.preMessage = void 0;
warning$2.resetWarned = resetWarned;
warning$2.warning = warning$1;
warning$2.warningOnce = warningOnce;
var warned = {};
var preMessage = warning$2.preMessage = function preMessage2(fn) {
};
function warning$1(valid, message2) {
}
function note(valid, message2) {
}
function resetWarned() {
  warned = {};
}
function call(method, valid, message2) {
  if (!valid && !warned[message2]) {
    method(false, message2);
    warned[message2] = true;
  }
}
function warningOnce(valid, message2) {
  call(warning$1, valid, message2);
}
function noteOnce(valid, message2) {
  call(note, valid, message2);
}
warningOnce.preMessage = preMessage;
warningOnce.resetWarned = resetWarned;
warningOnce.noteOnce = noteOnce;
warning$2.default = warningOnce;
var _interopRequireWildcard$3 = interopRequireWildcardExports.default;
var _interopRequireDefault$4 = interopRequireDefaultExports.default;
Object.defineProperty(utils, "__esModule", {
  value: true
});
utils.generate = generate;
utils.getSecondaryColor = getSecondaryColor;
utils.iconStyles = void 0;
utils.isIconDefinition = isIconDefinition;
utils.normalizeAttrs = normalizeAttrs;
utils.normalizeTwoToneColors = normalizeTwoToneColors;
utils.useInsertStyles = utils.svgBaseProps = void 0;
utils.warning = warning;
var _objectSpread2$1 = _interopRequireDefault$4(objectSpread2Exports);
var _typeof2 = _interopRequireDefault$4(_typeofExports);
var _colors$1 = require$$8;
var _dynamicCSS = dynamicCSS;
var _shadow = shadow;
var _warning = _interopRequireDefault$4(warning$2);
var _react = _interopRequireWildcard$3(require$$1);
var _Context$1 = _interopRequireDefault$4(Context);
function camelCase(input) {
  return input.replace(/-(.)/g, function(match, g) {
    return g.toUpperCase();
  });
}
function warning(valid, message2) {
  (0, _warning.default)(valid, "[@ant-design/icons] ".concat(message2));
}
function isIconDefinition(target) {
  return (0, _typeof2.default)(target) === "object" && typeof target.name === "string" && typeof target.theme === "string" && ((0, _typeof2.default)(target.icon) === "object" || typeof target.icon === "function");
}
function normalizeAttrs() {
  var attrs = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : {};
  return Object.keys(attrs).reduce(function(acc, key) {
    var val = attrs[key];
    switch (key) {
      case "class":
        acc.className = val;
        delete acc.class;
        break;
      default:
        delete acc[key];
        acc[camelCase(key)] = val;
    }
    return acc;
  }, {});
}
function generate(node, key, rootProps) {
  if (!rootProps) {
    return /* @__PURE__ */ _react.default.createElement(node.tag, (0, _objectSpread2$1.default)({
      key
    }, normalizeAttrs(node.attrs)), (node.children || []).map(function(child, index2) {
      return generate(child, "".concat(key, "-").concat(node.tag, "-").concat(index2));
    }));
  }
  return /* @__PURE__ */ _react.default.createElement(node.tag, (0, _objectSpread2$1.default)((0, _objectSpread2$1.default)({
    key
  }, normalizeAttrs(node.attrs)), rootProps), (node.children || []).map(function(child, index2) {
    return generate(child, "".concat(key, "-").concat(node.tag, "-").concat(index2));
  }));
}
function getSecondaryColor(primaryColor) {
  return (0, _colors$1.generate)(primaryColor)[0];
}
function normalizeTwoToneColors(twoToneColor) {
  if (!twoToneColor) {
    return [];
  }
  return Array.isArray(twoToneColor) ? twoToneColor : [twoToneColor];
}
utils.svgBaseProps = {
  width: "1em",
  height: "1em",
  fill: "currentColor",
  "aria-hidden": "true",
  focusable: "false"
};
var iconStyles = utils.iconStyles = "\n.anticon {\n  display: inline-flex;\n  align-items: center;\n  color: inherit;\n  font-style: normal;\n  line-height: 0;\n  text-align: center;\n  text-transform: none;\n  vertical-align: -0.125em;\n  text-rendering: optimizeLegibility;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.anticon > * {\n  line-height: 1;\n}\n\n.anticon svg {\n  display: inline-block;\n}\n\n.anticon::before {\n  display: none;\n}\n\n.anticon .anticon-icon {\n  display: block;\n}\n\n.anticon[tabindex] {\n  cursor: pointer;\n}\n\n.anticon-spin::before,\n.anticon-spin {\n  display: inline-block;\n  -webkit-animation: loadingCircle 1s infinite linear;\n  animation: loadingCircle 1s infinite linear;\n}\n\n@-webkit-keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n\n@keyframes loadingCircle {\n  100% {\n    -webkit-transform: rotate(360deg);\n    transform: rotate(360deg);\n  }\n}\n";
utils.useInsertStyles = function useInsertStyles(eleRef) {
  var _useContext = (0, _react.useContext)(_Context$1.default), csp = _useContext.csp, prefixCls = _useContext.prefixCls, layer = _useContext.layer;
  var mergedStyleStr = iconStyles;
  if (prefixCls) {
    mergedStyleStr = mergedStyleStr.replace(/anticon/g, prefixCls);
  }
  if (layer) {
    mergedStyleStr = "@layer ".concat(layer, " {\n").concat(mergedStyleStr, "\n}");
  }
  (0, _react.useEffect)(function() {
    var ele = eleRef.current;
    var shadowRoot = (0, _shadow.getShadowRoot)(ele);
    (0, _dynamicCSS.updateCSS)(mergedStyleStr, "@ant-design-icons", {
      prepend: !layer,
      csp,
      attachTo: shadowRoot
    });
  }, []);
};
var _interopRequireDefault$3 = interopRequireDefaultExports.default;
var _interopRequireWildcard$2 = interopRequireWildcardExports.default;
Object.defineProperty(IconBase$1, "__esModule", {
  value: true
});
IconBase$1.default = void 0;
var _objectWithoutProperties2$1 = _interopRequireDefault$3(objectWithoutPropertiesExports);
var _objectSpread2 = _interopRequireDefault$3(objectSpread2Exports);
var React$2 = _interopRequireWildcard$2(require$$1);
var _utils$2 = utils;
var _excluded$1 = ["icon", "className", "onClick", "style", "primaryColor", "secondaryColor"];
var twoToneColorPalette = {
  primaryColor: "#333",
  secondaryColor: "#E6E6E6",
  calculated: false
};
function setTwoToneColors(_ref) {
  var primaryColor = _ref.primaryColor, secondaryColor = _ref.secondaryColor;
  twoToneColorPalette.primaryColor = primaryColor;
  twoToneColorPalette.secondaryColor = secondaryColor || (0, _utils$2.getSecondaryColor)(primaryColor);
  twoToneColorPalette.calculated = !!secondaryColor;
}
function getTwoToneColors() {
  return (0, _objectSpread2.default)({}, twoToneColorPalette);
}
var IconBase = function IconBase2(props) {
  var icon = props.icon, className = props.className, onClick = props.onClick, style2 = props.style, primaryColor = props.primaryColor, secondaryColor = props.secondaryColor, restProps = (0, _objectWithoutProperties2$1.default)(props, _excluded$1);
  var svgRef = React$2.useRef();
  var colors = twoToneColorPalette;
  if (primaryColor) {
    colors = {
      primaryColor,
      secondaryColor: secondaryColor || (0, _utils$2.getSecondaryColor)(primaryColor)
    };
  }
  (0, _utils$2.useInsertStyles)(svgRef);
  (0, _utils$2.warning)((0, _utils$2.isIconDefinition)(icon), "icon should be icon definiton, but got ".concat(icon));
  if (!(0, _utils$2.isIconDefinition)(icon)) {
    return null;
  }
  var target = icon;
  if (target && typeof target.icon === "function") {
    target = (0, _objectSpread2.default)((0, _objectSpread2.default)({}, target), {}, {
      icon: target.icon(colors.primaryColor, colors.secondaryColor)
    });
  }
  return (0, _utils$2.generate)(target.icon, "svg-".concat(target.name), (0, _objectSpread2.default)((0, _objectSpread2.default)({
    className,
    onClick,
    style: style2,
    "data-icon": target.name,
    width: "1em",
    height: "1em",
    fill: "currentColor",
    "aria-hidden": "true"
  }, restProps), {}, {
    ref: svgRef
  }));
};
IconBase.displayName = "IconReact";
IconBase.getTwoToneColors = getTwoToneColors;
IconBase.setTwoToneColors = setTwoToneColors;
IconBase$1.default = IconBase;
var twoTonePrimaryColor = {};
var _interopRequireDefault$2 = interopRequireDefaultExports.default;
Object.defineProperty(twoTonePrimaryColor, "__esModule", {
  value: true
});
twoTonePrimaryColor.getTwoToneColor = getTwoToneColor;
twoTonePrimaryColor.setTwoToneColor = setTwoToneColor;
var _slicedToArray2$1 = _interopRequireDefault$2(slicedToArrayExports);
var _IconBase$1 = _interopRequireDefault$2(IconBase$1);
var _utils$1 = utils;
function setTwoToneColor(twoToneColor) {
  var _normalizeTwoToneColo = (0, _utils$1.normalizeTwoToneColors)(twoToneColor), _normalizeTwoToneColo2 = (0, _slicedToArray2$1.default)(_normalizeTwoToneColo, 2), primaryColor = _normalizeTwoToneColo2[0], secondaryColor = _normalizeTwoToneColo2[1];
  return _IconBase$1.default.setTwoToneColors({
    primaryColor,
    secondaryColor
  });
}
function getTwoToneColor() {
  var colors = _IconBase$1.default.getTwoToneColors();
  if (!colors.calculated) {
    return colors.primaryColor;
  }
  return [colors.primaryColor, colors.secondaryColor];
}
var _interopRequireDefault$1 = interopRequireDefaultExports.default;
var _interopRequireWildcard$1 = interopRequireWildcardExports.default;
Object.defineProperty(AntdIcon, "__esModule", {
  value: true
});
AntdIcon.default = void 0;
var _extends2$1 = _interopRequireDefault$1(_extendsExports);
var _slicedToArray2 = _interopRequireDefault$1(slicedToArrayExports);
var _defineProperty2 = _interopRequireDefault$1(definePropertyExports);
var _objectWithoutProperties2 = _interopRequireDefault$1(objectWithoutPropertiesExports);
var React$1 = _interopRequireWildcard$1(require$$1);
var _classnames = _interopRequireDefault$1(classNames);
var _colors = require$$8;
var _Context = _interopRequireDefault$1(Context);
var _IconBase = _interopRequireDefault$1(IconBase$1);
var _twoTonePrimaryColor = twoTonePrimaryColor;
var _utils = utils;
var _excluded = ["className", "icon", "spin", "rotate", "tabIndex", "onClick", "twoToneColor"];
(0, _twoTonePrimaryColor.setTwoToneColor)(_colors.blue.primary);
var Icon = /* @__PURE__ */ React$1.forwardRef(function(props, ref) {
  var className = props.className, icon = props.icon, spin = props.spin, rotate = props.rotate, tabIndex = props.tabIndex, onClick = props.onClick, twoToneColor = props.twoToneColor, restProps = (0, _objectWithoutProperties2.default)(props, _excluded);
  var _React$useContext = React$1.useContext(_Context.default), _React$useContext$pre = _React$useContext.prefixCls, prefixCls = _React$useContext$pre === void 0 ? "anticon" : _React$useContext$pre, rootClassName = _React$useContext.rootClassName;
  var classString = (0, _classnames.default)(rootClassName, prefixCls, (0, _defineProperty2.default)((0, _defineProperty2.default)({}, "".concat(prefixCls, "-").concat(icon.name), !!icon.name), "".concat(prefixCls, "-spin"), !!spin || icon.name === "loading"), className);
  var iconTabIndex = tabIndex;
  if (iconTabIndex === void 0 && onClick) {
    iconTabIndex = -1;
  }
  var svgStyle = rotate ? {
    msTransform: "rotate(".concat(rotate, "deg)"),
    transform: "rotate(".concat(rotate, "deg)")
  } : void 0;
  var _normalizeTwoToneColo = (0, _utils.normalizeTwoToneColors)(twoToneColor), _normalizeTwoToneColo2 = (0, _slicedToArray2.default)(_normalizeTwoToneColo, 2), primaryColor = _normalizeTwoToneColo2[0], secondaryColor = _normalizeTwoToneColo2[1];
  return /* @__PURE__ */ React$1.createElement("span", (0, _extends2$1.default)({
    role: "img",
    "aria-label": icon.name
  }, restProps, {
    ref,
    tabIndex: iconTabIndex,
    onClick,
    className: classString
  }), /* @__PURE__ */ React$1.createElement(_IconBase.default, {
    icon,
    primaryColor,
    secondaryColor,
    style: svgStyle
  }));
});
Icon.displayName = "AntdIcon";
Icon.getTwoToneColor = _twoTonePrimaryColor.getTwoToneColor;
Icon.setTwoToneColor = _twoTonePrimaryColor.setTwoToneColor;
AntdIcon.default = Icon;
var _interopRequireWildcard = interopRequireWildcardExports.default;
var _interopRequireDefault = interopRequireDefaultExports.default;
Object.defineProperty(QuestionCircleOutlined$4, "__esModule", {
  value: true
});
QuestionCircleOutlined$4.default = void 0;
var _extends2 = _interopRequireDefault(_extendsExports);
var React = _interopRequireWildcard(require$$1);
var _QuestionCircleOutlined = _interopRequireDefault(QuestionCircleOutlined$3);
var _AntdIcon = _interopRequireDefault(AntdIcon);
var QuestionCircleOutlined$1 = function QuestionCircleOutlined2(props, ref) {
  return /* @__PURE__ */ React.createElement(_AntdIcon.default, (0, _extends2.default)({}, props, {
    ref,
    icon: _QuestionCircleOutlined.default
  }));
};
var RefIcon = /* @__PURE__ */ React.forwardRef(QuestionCircleOutlined$1);
QuestionCircleOutlined$4.default = RefIcon;
(function(module, exports) {
  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = void 0;
  const _QuestionCircleOutlined2 = _interopRequireDefault2(QuestionCircleOutlined$4);
  function _interopRequireDefault2(obj) {
    return obj && obj.__esModule ? obj : { "default": obj };
  }
  const _default = _QuestionCircleOutlined2;
  exports.default = _default;
  module.exports = _default;
})(QuestionCircleOutlined$5, QuestionCircleOutlined$5.exports);
var QuestionCircleOutlinedExports = QuestionCircleOutlined$5.exports;
const QuestionCircleOutlined = /* @__PURE__ */ getDefaultExportFromCjs(QuestionCircleOutlinedExports);
const FormPropLabel = DynamicFormTheme.flexy(
  "FormPropLabel",
  memo((props) => {
    var _a, _b;
    const { name, description } = props;
    const label = "label" in description ? ((_a = description.label) == null ? void 0 : _a.toString()) ?? name : name;
    if (!("meta" in description) || ((_b = description.meta) == null ? void 0 : _b.description) == null) {
      return label;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Space, { size: 0, children: [
      label,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { title: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: clx("text-pre-wrap"), children: description.meta.description }), children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "link", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(QuestionCircleOutlined, {}) }) })
    ] });
  })
);
const OPTIONS = BINARY_OPERATORS.map((op) => ({ label: op, value: op }));
const FormBinaryExpressionOperator = DynamicFormTheme.flexy(
  "FormBinaryExpressionOperator",
  (props) => {
    const { name } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Select, { name, options: OPTIONS, style: { minWidth: 150 } });
  }
);
const FormConstantExpression = DynamicFormTheme.flexy(
  "FormConstantExpression",
  (props) => {
    const { name } = props;
    const [{ value, onBlur }, , { setValue, setTouched }] = useField(name);
    function onChange(e) {
      const value2 = e.target.value;
      setValue({ type: "ConstantExpression", value: value2 });
      setTouched(true, true);
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Input$1, { onChange, onBlur, value: (value == null ? void 0 : value.value) ?? "" });
  }
);
const FORM_CONSTANT_EXPRESSION_SCHEMA = Yup.object({
  type: Yup.string().oneOf(["ConstantExpression"]).required(),
  value: Yup.mixed().required()
});
const FormReferenceExpression = DynamicFormTheme.flexy(
  "FormReferenceExpression",
  (props) => {
    const { name } = props;
    const { model } = useDesignerContext();
    const options2 = useMemo(
      () => model.elements.map((el) => ({ value: el.id, label: el.id })),
      [model.elements]
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Select, { name: `${name}.ref`, options: options2, style: { minWidth: 120 } });
  }
);
const FORM_REFERENCE_EXPRESSION_SCHEMA = Yup.object({
  type: Yup.string().oneOf(["ReferenceExpression"]).required(),
  ref: Yup.string().required()
});
function FormControl(props) {
  const { name } = props;
  const [{ value }] = useField(name);
  if (value.type === "ReferenceExpression") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(FormReferenceExpression, { name });
  }
  if (value.type === "CallExpression") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(FormReferenceExpression, { name: `${name}.args[0]` });
  }
}
function useValueChange(props) {
  const { name } = props;
  const [{ value }, , { setValue }] = useField(name);
  return useCallback(
    (newValue) => {
      if (newValue === "value" && value.type === "CallExpression") {
        setValue(value.args[0]);
      }
      if (newValue === "len" && value.type === "ReferenceExpression") {
        setValue({
          type: "CallExpression",
          function: "len",
          args: [value]
        });
      }
    },
    [value, setValue]
  );
}
const FormBinaryExpressionLeft = DynamicFormTheme.flexy(
  "FormBinaryExpressionLeft",
  (props) => {
    const { name } = props;
    const [{ value }] = useField(name);
    const onValueChange = useValueChange(props);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Space, { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(FormControl, { name }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Select$1,
        {
          value: value.type === "ReferenceExpression" ? "value" : "len",
          onChange: onValueChange,
          options: [
            { value: "value", label: "Value" },
            { value: "len", label: "Length()" }
          ]
        }
      )
    ] });
  }
);
function findParentPath(name) {
  const path = parsePath(name);
  return path != null ? pathToName(path.slice(0, -2)) : null;
}
const INITIAL_VALUE$2 = {
  type: "BinaryExpression",
  operator: "=",
  left: { type: "ReferenceExpression", ref: null },
  right: { type: "ConstantExpression", value: null }
};
function useAdd$1(props) {
  const { name } = props;
  const [{ value }, , { setValue }] = useField(name);
  return useCallback(() => {
    setValue({
      type: "BoolExpression",
      operator: "and",
      expressions: [value, INITIAL_VALUE$2]
    });
  }, [value, setValue]);
}
function useParent(props) {
  const { name: fieldName } = props;
  const { values } = useFormikContext();
  const name = useMemo(() => findParentPath(fieldName), [fieldName]);
  const value = useMemo(() => name && getIn(values, name), [values, name]);
  return name ? { value, name } : null;
}
function useDelete$1(props, parent) {
  const { name } = props;
  const { setFieldValue } = useFormikContext();
  return useCallback(() => {
    if (!parent) {
      setFieldValue(name, null);
      return;
    }
    if (parent.value.type === "BoolExpression" && parent.value.expressions.length === 2) {
      setFieldValue(parent.name, parent.value.expressions[0]);
      return;
    }
    if (parent.value.type === "BoolExpression" && parent.value.expressions.length > 2) {
      const index2 = parseIndex(name);
      const newExpressions = [...parent.value.expressions];
      newExpressions.splice(index2, 1);
      setFieldValue(parent.name, { ...parent.value, expressions: newExpressions });
    }
    throw new Error(
      `Cannot delete expression at ${name} from parent ${parent.name}. Parent value: ${JSON.stringify(parent.value)}`
    );
  }, [parent, setFieldValue, name]);
}
const FormBinaryExpressionComponent = DynamicFormTheme.flexy(
  "FormBinaryExpression",
  (props) => {
    const { name } = props;
    const parent = useParent(props);
    const onAdd = useAdd$1(props);
    const onDelete = useDelete$1(props, parent);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Row, { wrap: false, gutter: 8, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Col, { flex: "none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormBinaryExpressionLeft, { name: `${name}.left` }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Col, { flex: "none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormBinaryExpressionOperator, { name: `${name}.operator` }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Col, { flex: "auto", children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormConstantExpression, { name: `${name}.right` }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Col, { flex: "none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { color: "default", variant: "filled", onClick: onAdd, children: "AND" }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Col, { flex: "none", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { color: "default", variant: "filled", onClick: onDelete, children: "DEL" }) })
    ] });
  }
);
const FormBinaryExpression = Object.assign(FormBinaryExpressionComponent, {
  initialValue: INITIAL_VALUE$2
});
const options = BOOL_OPERATORS.map((op) => ({ label: op, value: op }));
const FormBoolExpressionOperator = DynamicFormTheme.flexy(
  "FormBoolExpressionOperator",
  (props) => {
    const { name, ...selectProps } = props;
    const [{ value, onBlur }, , { setTouched, setValue }] = useField(name);
    function onChange(value2) {
      setValue(value2);
      setTouched(true, true);
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Select$1, { ...selectProps, value, options, onChange, onBlur });
  }
);
function useAdd(props) {
  const { name } = props;
  const [, , { setValue }] = useField(name);
  return useCallback(() => setValue(FormBinaryExpression.initialValue), [setValue]);
}
function Blurb(props) {
  const onAdd = useAdd(props);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "No expression set" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Flex, { justify: "center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: onAdd, type: "primary", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PlusOutlined, {}), children: "Add Expression" }) })
  ] });
}
const FormExpressionEmpty = DynamicFormTheme.flexy(
  "FormExpressionEmpty",
  (props) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Empty,
      {
        description: /* @__PURE__ */ jsxRuntimeExports.jsx(Blurb, { ...props }),
        image: Empty.PRESENTED_IMAGE_SIMPLE,
        style: { marginTop: 20 }
      }
    );
  }
);
const FormExpression = DynamicFormTheme.flexy("FormExpression", (props) => {
  const { name } = props;
  const [{ value }] = useField(name);
  if (value == null) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(FormExpressionEmpty, { name });
  }
  switch (value == null ? void 0 : value.type) {
    case "BoolExpression":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(FormBoolExpression, { name });
    case "BinaryExpression":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(FormBinaryExpression, { name });
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: "Unknown Expression Type" });
  }
});
const FormBoolExpressionAddButton = DynamicFormTheme.flexy(
  "FormBoolExpressionAddButton",
  (props) => {
    const { name } = props;
    const [{ value }, , { setValue }] = useField(name);
    const onClick = useCallback(
      () => setValue({
        ...value,
        expressions: [
          ...value.expressions,
          { type: "BinaryExpression", operator: "=", left: null, right: null }
        ]
      }),
      [value, setValue]
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { color: "default", variant: "filled", onClick, children: "Add Expression" });
  }
);
const FormBoolExpression = DynamicFormTheme.flexy(
  "FormBoolExpression",
  (props) => {
    const { name } = props;
    const [{ value }] = useField(name);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Flex, { vertical: true, gap: "small", align: "start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Flex, { gap: "small", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormBoolExpressionOperator, { name: `${name}.operator` }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { color: "default", variant: "filled", onClick: () => {
        }, children: "DEL" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: clx("form-bool-expression-list"), children: [
        value.expressions.map((_, index2) => /* @__PURE__ */ jsxRuntimeExports.jsx(FormExpression, { name: `${name}.expressions[${index2}]` }, index2)),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormBoolExpressionAddButton, { name }) })
      ] })
    ] });
  }
);
const FORM_BOOL_EXPRESSION_SCHEMA = Yup.object({
  type: Yup.string().oneOf(["BoolExpression"]).required(),
  operator: Yup.string().oneOf(BOOL_OPERATORS).required(),
  expressions: Yup.lazy(() => Yup.array(FORM_EXPRESSION_SCHEMA).required())
});
const CALL_EXPRESSION_SCHEMA = Yup.object({
  type: Yup.string().oneOf(["CallExpression"]).required(),
  function: Yup.string().oneOf(CALL_EXPRESSION_FUNCTIONS).required(),
  args: Yup.lazy(() => Yup.array(FORM_EXPRESSION_SCHEMA).required())
});
const FORM_EXPRESSION_SCHEMA = Yup.lazy((value) => {
  if (!value) {
    return Yup.object().nullable();
  }
  switch (value.type) {
    case "ConstantExpression":
      return FORM_CONSTANT_EXPRESSION_SCHEMA.required();
    case "ReferenceExpression":
      return FORM_REFERENCE_EXPRESSION_SCHEMA.required();
    case "BoolExpression":
      return FORM_BOOL_EXPRESSION_SCHEMA.required();
    case "BinaryExpression":
      return FORM_BINARY_EXPRESSION_SCHEMA.required();
    case "CallExpression":
      return CALL_EXPRESSION_SCHEMA.required();
    default:
      throw new Error(`Unknown expression type: ${value.type}`);
  }
});
const FORM_BINARY_EXPRESSION_SCHEMA = Yup.object({
  type: Yup.string().oneOf(["BinaryExpression"]).required(),
  left: Yup.lazy(() => FORM_EXPRESSION_SCHEMA),
  operator: Yup.string().required(),
  right: Yup.lazy(() => FORM_CONSTANT_EXPRESSION_SCHEMA)
});
const ConstantExpressionValue = DynamicFormTheme.flexy(
  "ConstantExpressionValue",
  (props) => {
    const { value } = props;
    if (Array.isArray(value.value)) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: value.value.join(", ") });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: value.value });
  }
);
const BinaryExpressionValue = DynamicFormTheme.flexy(
  "BinaryExpressionValue",
  (props) => {
    const { value } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
      value.left ? /* @__PURE__ */ jsxRuntimeExports.jsx(ExpressionValue, { value: value.left }) : "NULL",
      ` ${value.operator} `,
      value.right ? /* @__PURE__ */ jsxRuntimeExports.jsx(ExpressionValue, { value: value.right }) : "NULL"
    ] });
  }
);
const BoolExpressionValue = DynamicFormTheme.flexy(
  "BoolExpressionValue",
  (props) => {
    const { value } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      "(",
      /* @__PURE__ */ jsxRuntimeExports.jsx(Space, { split: value.operator, children: value.expressions.map((expression, index2) => /* @__PURE__ */ jsxRuntimeExports.jsx(ExpressionValue, { value: expression }, index2)) }),
      ")"
    ] });
  }
);
const ReferenceExpressionValue = DynamicFormTheme.flexy(
  "ReferenceExpressionValue",
  (props) => {
    const { value } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: value.ref });
  }
);
const CallExpressionValue = DynamicFormTheme.flexy(
  "CallExpressionValue",
  (props) => {
    const { value } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
      value.function,
      "(",
      value.args.map((arg, index2) => /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(ExpressionValue, { value: arg }),
        index2 < value.args.length - 1 ? ", " : ""
      ] }, index2)),
      ")"
    ] });
  }
);
const ExpressionValue = DynamicFormTheme.flexy("ExpressionValue", (props) => {
  const { value } = props;
  switch (value.type) {
    case "ReferenceExpression":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ReferenceExpressionValue, { value });
    case "ConstantExpression":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(ConstantExpressionValue, { value });
    case "BinaryExpression":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(BinaryExpressionValue, { value });
    case "BoolExpression":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(BoolExpressionValue, { value });
    case "CallExpression":
      return /* @__PURE__ */ jsxRuntimeExports.jsx(CallExpressionValue, { value });
    default:
      return /* @__PURE__ */ jsxRuntimeExports.jsx("span", { style: { color: "red" }, children: "Unknown Expression Type" });
  }
});
const SCHEMA$1 = Yup.object({
  value: FORM_EXPRESSION_SCHEMA
});
const INITIAL_VALUE$1 = {
  value: FormBinaryExpression.initialValue
};
const ExpressionFormComponent = DynamicFormTheme.flexy("ExpressionForm", (props) => {
  const { initialValue: initialValue2, onSubmit } = props;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Form,
    {
      type: "formik",
      uid: ExpressionForm.uid,
      initialValues: initialValue2,
      validationSchema: SCHEMA$1,
      onSubmit,
      layout: "vertical",
      children: ({ values }) => /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormExpression, { name: "value" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { style: { marginTop: 20 }, children: values.value && /* @__PURE__ */ jsxRuntimeExports.jsx(ExpressionValue, { value: values.value }) })
      ] })
    }
  );
});
const ExpressionForm = Object.assign(ExpressionFormComponent, {
  uid: "edit-expression-form",
  schema: SCHEMA$1,
  initialValue: INITIAL_VALUE$1
});
function useFormValue(props) {
  const { initialValue: initialValue2 } = props;
  return useMemo(
    () => initialValue2 ? { value: initialValue2 } : ExpressionForm.initialValue,
    [initialValue2]
  );
}
function useSubmit$3(props) {
  const { onSubmit } = props;
  return useCallback((value) => onSubmit(value.value), [onSubmit]);
}
const EditExpressionModal = DynamicFormTheme.flexy(
  "EditExpressionModal",
  (props) => {
    const { onClose, title = "Edit Expression" } = props;
    const submitForm = Form.useSubmit(ExpressionForm.uid);
    const formValue = useFormValue(props);
    const onSubmit = useSubmit$3(props);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: true,
        title,
        onCancel: onClose,
        onOk: submitForm,
        width: "80%",
        style: { maxWidth: 1e3 },
        className: clx("edit-expression-modal"),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExpressionForm, { initialValue: formValue, onSubmit })
      }
    );
  }
);
const FormExpressionEditable = DynamicFormTheme.flexy(
  "FormExpressionEditable",
  (props) => {
    const name = Form.useName(props.name);
    const [{ value }, , { setTouched, setValue }] = useField(name);
    const [isOpen, setOpen] = useState(false);
    function onChange(value2) {
      setOpen(false);
      setValue(value2);
      setTouched(true, true);
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      value && /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExpressionValue, { value }) }),
      !value && /* @__PURE__ */ jsxRuntimeExports.jsx(Typography.Text, { type: "secondary", italic: true, children: "No expression set" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "link", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(EditOutlined, {}), onClick: () => setOpen(true) }),
      isOpen && /* @__PURE__ */ jsxRuntimeExports.jsx(EditExpressionModal, { initialValue: value, onClose: () => setOpen(false), onSubmit: onChange })
    ] });
  }
);
const FormPropList = DynamicFormTheme.flexy(
  "FormPropList",
  (props) => {
    const { name, description } = props;
    const [{ value }, , { setValue }] = useField(name);
    if (!value) {
      return null;
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      List,
      {
        dataSource: value.map((_, index2) => ({ key: index2 })),
        renderItem: ({ key }) => /* @__PURE__ */ jsxRuntimeExports.jsx(
          List.Item,
          {
            className: clx("form-prop-list-item"),
            actions: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "link",
                  icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DeleteOutlined, {}),
                  onClick: () => setValue(value.filter((_, i) => i !== key))
                },
                "delete"
              )
            ],
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormProp, { name: `${name}[${key}]`, description: description.innerType, noLabel: true, noErrorMessage: true })
          }
        ),
        footer: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            color: "default",
            variant: "filled",
            onClick: () => setValue([...value, null]),
            icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PlusOutlined, {}),
            children: "Add item"
          }
        ),
        locale: { emptyText: "No items" },
        rootClassName: clx("form-prop-list")
      }
    );
  }
);
const FormProp = DynamicFormTheme.flexy(
  "FormProp",
  memo((props) => {
    var _a, _b;
    const { name, description, noLabel, noErrorMessage } = props;
    const createFormItemElement = useCallback(
      (children, props2) => /* @__PURE__ */ jsxRuntimeExports.jsx(
        Form.Item,
        {
          label: noLabel ? false : /* @__PURE__ */ jsxRuntimeExports.jsx(FormPropLabel, { name, description }),
          required: SchemaUtil.isRequired(description),
          name,
          nameAbsolute: true,
          noErrorMessage,
          className: classNames({ [clx("no-error-message")]: noErrorMessage }),
          ...props2,
          children
        }
      ),
      [name, description, noLabel, noErrorMessage]
    );
    if ((description.type === "string" || description.type === "number") && SchemaUtil.isOneOfDescription(description) && description.oneOf.length > 0) {
      return createFormItemElement(
        /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Select, { options: description.oneOf.map((x) => ({ label: x, value: x })), allowClear: true })
      );
    }
    if (description.type === "string" && ((_a = description.meta) == null ? void 0 : _a.control) === "textarea") {
      return createFormItemElement(/* @__PURE__ */ jsxRuntimeExports.jsx(Form.TextArea, { autoSize: { minRows: 4, maxRows: 10 } }));
    }
    if (description.type === "boolean" && ((_b = description.meta) == null ? void 0 : _b.control) === "expression") {
      return createFormItemElement(/* @__PURE__ */ jsxRuntimeExports.jsx(FormExpressionEditable, { name }));
    }
    if (description.type === "string") {
      return createFormItemElement(/* @__PURE__ */ jsxRuntimeExports.jsx(Form.Input, {}));
    }
    if (description.type === "array" && SchemaUtil.isArrayOfDescription(description)) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        Form.Item,
        {
          label: /* @__PURE__ */ jsxRuntimeExports.jsx(FormPropLabel, { name, description }),
          required: SchemaUtil.isRequired(description),
          name,
          nameAbsolute: true,
          children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormPropList, { name, description })
        }
      );
    }
    if (description.type === "number") {
      return createFormItemElement(/* @__PURE__ */ jsxRuntimeExports.jsx(Form.InputNumber, {}));
    }
    if (description.type === "boolean") {
      return createFormItemElement(
        /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Checkbox, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormPropLabel, { name, description }) }),
        { label: false }
      );
    }
    if (description.type === "object" && "fields" in description) {
      return /* @__PURE__ */ jsxRuntimeExports.jsx(
        List,
        {
          dataSource: Object.keys(description.fields),
          renderItem: (key) => /* @__PURE__ */ jsxRuntimeExports.jsx(List.Item, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormProp, { name: `${name}.${key}`, description: description.fields[key] }) })
        }
      );
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Typography.Text, { type: "danger", children: "Unknown type" });
  })
);
function FormAutoSubmit({ schema }) {
  const { values, submitForm } = useFormikContext();
  useEffect(() => {
    if (schema.isValidSync(values)) {
      submitForm();
    }
  }, [values]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, {});
}
const SCHEMA = Yup.object({
  test: Yup.mixed().required(),
  message: Yup.string().nullable().required()
});
const INITIAL_VALUE = {
  message: null,
  test: FormBinaryExpression.initialValue
};
function FormContent() {
  const { values } = useFormikContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Form.Item,
      {
        name: "test",
        label: "Test",
        required: true,
        extra: values.test && /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExpressionValue, { value: values.test }) }),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormExpression, { name: "test" })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Item, { name: "message", label: "Message", required: true, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Input, {}) })
  ] });
}
const ValidationRuleFormComponent = DynamicFormTheme.flexy(
  "ValidationRuleForm",
  (props) => {
    const {
      initialValue: initialValue2,
      onSubmit,
      innerRef,
      uid = EditValidationForm.uid,
      schema = EditValidationForm.schema
    } = props;
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Form,
      {
        type: "formik",
        uid,
        initialValues: initialValue2,
        onSubmit,
        validationSchema: schema,
        innerRef,
        layout: "vertical",
        enableReinitialize: true,
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormContent, {})
      }
    );
  }
);
const EditValidationForm = Object.assign(ValidationRuleFormComponent, {
  schema: SCHEMA,
  initialValue: INITIAL_VALUE,
  uid: "validation-rule-form"
});
function useSubmit$2(props) {
  const { onSubmit } = props;
  return (value) => onSubmit({ ...value, type: "test" });
}
const ValidationRuleModalComponent = DynamicFormTheme.flexy(
  "ValidationRuleModal",
  (props) => {
    const {
      initialValue: initialValue2 = EditValidationForm.initialValue,
      onClose,
      title = ValidationRuleModal.title
    } = props;
    const form = useRef(null);
    const onSubmit = useSubmit$2(props);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        open: true,
        title,
        onCancel: onClose,
        onOk: () => {
          var _a;
          return (_a = form.current) == null ? void 0 : _a.submitForm();
        },
        width: "80%",
        style: { maxWidth: 1e3 },
        className: clx("validation-rule-modal"),
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(EditValidationForm, { initialValue: initialValue2, onSubmit, innerRef: form })
      }
    );
  }
);
const ValidationRuleModal = Object.assign(ValidationRuleModalComponent, {
  title: "Validation Rule"
});
function useSubmit$1(props, onSubmitted) {
  const { name } = props;
  const [{ value }, , { setValue }] = useField(name);
  return useCallback(
    (formValue) => {
      const newValue = (value == null ? void 0 : value.slice()) ?? [];
      newValue.push({ type: "test", ...formValue });
      setValue(newValue);
      onSubmitted();
    },
    [value, setValue, onSubmitted]
  );
}
const FormAddValidationRuleButton = DynamicFormTheme.flexy(
  "FormAddValidationRuleButton",
  (props) => {
    const { text = "Add Validation Rule" } = props;
    const [modalShown, setModalShown] = useState(false);
    const toggleModal = useCallback(() => setModalShown((prev) => !prev), []);
    const onSubmit = useSubmit$1(props, toggleModal);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
      modalShown && /* @__PURE__ */ jsxRuntimeExports.jsx(ValidationRuleModal, { onClose: toggleModal, onSubmit }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { icon: /* @__PURE__ */ jsxRuntimeExports.jsx(PlusOutlined, {}), color: "default", variant: "filled", onClick: toggleModal, children: text })
    ] });
  }
);
function useCheckbox(props) {
  const { name } = props;
  const [{ value }, , { setValue, setTouched }] = useField(name);
  const checked = useMemo(() => !!value && value.some(isRequiredValidationRule), [value]);
  const onChange = useCallback(
    (e) => {
      let newValue = (value == null ? void 0 : value.filter((x) => !isRequiredValidationRule(x))) ?? [];
      if (e.target.checked) newValue = [...newValue, { type: "required", message: null }];
      setValue(newValue.length > 0 ? newValue : null);
      setTouched(true, true);
    },
    [value, setValue, setTouched]
  );
  return { checked, onChange };
}
const FormValidationRequired = DynamicFormTheme.flexy(
  "FormValidationRequired",
  (props) => {
    const { text = "Required?" } = props;
    const { checked, onChange } = useCheckbox(props);
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Checkbox, { checked, onChange, children: text });
  }
);
function useSubmit(props, onSubmitted) {
  const { name } = props;
  const [{ value }, , { setValue }] = useField(name);
  return useCallback(
    (values) => Promise.resolve(setValue({ ...value, ...values })).then(onSubmitted),
    [value, setValue, onSubmitted]
  );
}
const FormValidationTest = DynamicFormTheme.flexy(
  "FormValidationTest",
  (props) => {
    const { name, onDelete: onDeleteProp } = props;
    const [{ value }] = useField(name);
    const [modalShown, setModalShown] = useState(false);
    const toggleModal = useCallback(() => setModalShown((prev) => !prev), []);
    const onSubmit = useSubmit(props, toggleModal);
    const onDelete = useMemo(
      () => onDeleteProp ? () => onDeleteProp(value) : void 0,
      [onDeleteProp, value]
    );
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ExpressionValue, { value: value.test }) }),
      value.message,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "link", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(EditOutlined, {}), onClick: toggleModal }),
      onDelete && /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: onDelete, type: "link", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(DeleteOutlined, {}) }),
      modalShown && /* @__PURE__ */ jsxRuntimeExports.jsx(ValidationRuleModal, { initialValue: value, onSubmit, onClose: toggleModal })
    ] });
  }
);
function useDelete(props) {
  const name = Form.useName(props.name);
  const [{ value: rules }, , { setValue }] = useField(name);
  return useCallback(
    (value) => setValue(rules.filter((x) => x !== value)),
    [setValue, rules]
  );
}
const FormValidationBlock = DynamicFormTheme.flexy(
  "FormValidationBlock",
  (props) => {
    const name = Form.useName(props.name);
    const [{ value: rules }] = useField(name);
    const onDelete = useDelete(props);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Flex, { vertical: true, gap: "small", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormValidationRequired, { name }) }),
      rules == null ? void 0 : rules.map((rule, index2) => {
        if (rule.type === "required") {
          return null;
        }
        if (rule.type === "test") {
          return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormValidationTest, { name: `${name}[${index2}]`, onDelete }) }, index2);
        }
        return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Typography.Text, { type: "danger", children: "Unknown validation rule" }) }, index2);
      }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { style: { marginTop: "1rem" }, children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormAddValidationRuleButton, { name }) })
    ] });
  }
);
function useElementModelSchema() {
  const { selectedElement } = useDesignerContext();
  const { props } = selectedElement;
  return useMemo(() => {
    let propsSchema = props;
    const fields = props.describe().fields;
    for (const key in fields) {
      if (Object.prototype.hasOwnProperty.call(fields, key)) {
        const element = fields[key];
        if (element.type === "boolean" && element.meta && element.meta.control === "expression") {
          const isRequired2 = SchemaUtil.isRequired(element);
          let newPropSchema = Yup.boolean().nullable();
          if (isRequired2) newPropSchema = newPropSchema.required();
          propsSchema = propsSchema.concat(Yup.object({ [key]: newPropSchema }));
        }
      }
    }
    return Yup.object({ props: props.required(), validation: Yup.array(Yup.object().required()).nullable() });
  }, [props]);
}
function useEditValue(messageApi) {
  const { selectedId } = useDesignerContext();
  const [isEdit, setEdit] = useState(false);
  const [idEditValue, setIdEditValue] = useState(selectedId);
  const { renameElement } = useDesignerContext();
  const toggleEdit = useCallback(() => setEdit((prev) => !prev), []);
  useEffect(() => {
    setIdEditValue(selectedId);
    setEdit(false);
  }, [selectedId]);
  const onSubmit = useCallback(() => {
    const value = idEditValue == null ? void 0 : idEditValue.trim();
    const error = validateModelElementId(value);
    if (error) {
      messageApi.error(error);
      return;
    }
    if (value !== selectedId) {
      renameElement(selectedId, value);
    }
    setEdit(false);
  }, [idEditValue, selectedId, renameElement, messageApi]);
  return { selectedId, isEdit, toggleEdit, idEditValue, onIdEditValueChange: setIdEditValue, onSubmit };
}
const ElementModelIdControl = DynamicFormTheme.flexy(
  "ElementModelIdControl",
  (props) => {
    const { style: style2 } = props;
    const [messageApi, messageContext] = message.useMessage();
    const { selectedId, idEditValue, isEdit, onIdEditValueChange, toggleEdit, onSubmit } = useEditValue(messageApi);
    if (!isEdit) {
      return /* @__PURE__ */ jsxRuntimeExports.jsxs(Flex, { align: "center", style: style2, children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Tag, { children: selectedId }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: toggleEdit, icon: /* @__PURE__ */ jsxRuntimeExports.jsx(EditOutlined, {}), type: "link" })
      ] });
    }
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(Flex, { gap: "small", align: "center", style: style2, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Input$1,
        {
          value: idEditValue ?? "",
          onChange: (e) => onIdEditValueChange(e.target.value),
          onPressEnter: onSubmit,
          autoFocus: true
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: onSubmit, type: "link", children: "Save" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: toggleEdit, type: "link", children: "Discard" }),
      messageContext
    ] });
  }
);
const ElementModelDesigner = DynamicFormTheme.flexy("ElementModelDesigner", () => {
  const { model, set, selected, selectedElement: Element2 } = useDesignerContext();
  const schema = useElementModelSchema();
  const description = useMemo(() => Element2.props.describe(), [Element2.props]);
  const onSubmit = useCallback(
    (values) => set({
      ...model,
      elements: model.elements.map((el) => el.id === selected.id ? { ...el, ...values } : el)
    }),
    [model, selected, set]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: clx("element-model-designer"), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Form,
    {
      type: "formik",
      uid: "element-model-designer-form",
      onSubmit,
      initialValues: selected,
      validationSchema: schema,
      enableReinitialize: true,
      layout: "vertical",
      rootClassName: clx("element-model-designer-form"),
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { children: (Element2 == null ? void 0 : Element2.title) ?? (Element2 == null ? void 0 : Element2.id) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(ElementModelIdControl, { style: { marginBottom: "1rem" } }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(FormAutoSubmit, { schema }),
        Object.entries(description.fields).map(([name, description2]) => /* @__PURE__ */ jsxRuntimeExports.jsx(FormProp, { name: `props.${name}`, description: description2 }, name)),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Form.Item,
          {
            name: "condition",
            label: /* @__PURE__ */ jsxRuntimeExports.jsxs(Space, { size: 0, children: [
              "Condition",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Tooltip,
                {
                  title: `This condition is used to determine when this element should be displayed. It can be an
                  expression that evaluates to true or false.`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "link", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(QuestionCircleOutlined$6, {}) })
                }
              )
            ] }),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormExpressionEditable, { name: "condition" })
          }
        ),
        (Element2 == null ? void 0 : Element2.value) !== "readonly" && /* @__PURE__ */ jsxRuntimeExports.jsx(
          Form.Item,
          {
            name: "validation",
            label: /* @__PURE__ */ jsxRuntimeExports.jsxs(Space, { size: 0, children: [
              "Validation",
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Tooltip,
                {
                  title: `Validation rules for this element. You can define multiple rules, each with a test expression and a message.`,
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { type: "link", icon: /* @__PURE__ */ jsxRuntimeExports.jsx(QuestionCircleOutlined$6, {}) })
                }
              )
            ] }),
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(FormValidationBlock, { name: "validation" })
          }
        )
      ]
    }
  ) });
});
const JsonValue = DynamicFormTheme.flexy(
  "JsonValue",
  memo((props) => {
    const { value } = props;
    const [expanded, setExpanded] = useState(false);
    return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { style: { position: "relative" }, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("pre", { style: { overflowY: "auto", maxHeight: expanded ? void 0 : 500 }, children: JSON.stringify(value, void 0, 2) }),
      !expanded && /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          style: { position: "absolute", bottom: 25, right: 25 },
          color: "default",
          variant: "solid",
          onClick: () => setExpanded(true),
          children: "EXPAND"
        }
      )
    ] });
  })
);
const Schema = memo(() => {
  const { model, Elements } = useDesignerContext();
  const value = useMemo(
    () => model.elements.map((x) => {
      var _a;
      return (_a = Elements.find((el) => el.id === x.element)) == null ? void 0 : _a.props.describe();
    }),
    [model.elements, Elements]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: clx("designer-state-schema"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(JsonValue, { value }) });
});
const Model = memo(() => {
  const { model } = useDesignerContext();
  return /* @__PURE__ */ jsxRuntimeExports.jsx(JsonValue, { value: model });
});
const DesignerState = DynamicFormTheme.flexy("DesignerState", () => {
  const [active, setActive] = useState(null);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: clx("designer-state"), children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: clx("designer-state-tabs"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      Radio.Group,
      {
        value: active,
        optionType: "button",
        onChange: (e) => setActive(e.target.value),
        options: [
          { label: "Model", value: "model" },
          { label: "Schema", value: "schema" }
        ]
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: clx("designer-state-content"), children: [
      active === "model" && /* @__PURE__ */ jsxRuntimeExports.jsx(Model, {}),
      active === "schema" && /* @__PURE__ */ jsxRuntimeExports.jsx(Schema, {})
    ] })
  ] });
});
function renderDynamicFormElement(args) {
  var _a;
  const { Elements, modelElement, values } = args;
  const Element2 = Elements.find((x) => x.id === modelElement.element).Component;
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Element2,
    {
      ...ModelUtil.propsOf(modelElement, values),
      name: modelElement.id,
      required: ((_a = modelElement.validation) == null ? void 0 : _a.some(isRequiredValidationRule)) === true
    },
    modelElement.id
  );
}
function useSchema(model, Elements) {
  const findElement = useCallback((id) => Elements.find((el) => el.id === id), [Elements]);
  return useMemo(() => {
    return Yup.object(
      Object.fromEntries(
        model.elements.map((x) => [x.id, ModelUtil.schemaOf(x, findElement(x.element))])
      )
    );
  }, [model, findElement]);
}
function Element(props) {
  const { renderElement = renderDynamicFormElement, ...args } = props;
  const [, , { setValue }] = useField(args.modelElement.id);
  useEffect(() => {
    return () => {
      setValue(ModelUtil.elementInitialValue(args.modelElement));
    };
  }, []);
  return renderElement({ ...args });
}
function Content(props) {
  const { model, renderElement, Elements } = props;
  const { values } = useFormikContext();
  const isShown = useCallback(
    (el) => !el.condition || ExpressionUtil.exec(el.condition, values),
    [values]
  );
  return model.elements.filter(isShown).map((element) => /* @__PURE__ */ jsxRuntimeExports.jsx(
    Element,
    {
      renderElement,
      Elements,
      model,
      modelElement: element,
      values
    },
    element.id
  ));
}
function DynamicForm(props) {
  const { uid = "dynamic-form", Elements, model, initialValue: initialValue2, onSubmit, className, renderElement } = props;
  const schema = useSchema(model, Elements);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: classNames(clx("dynamic-form"), className), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Form,
    {
      uid,
      type: "formik",
      initialValues: initialValue2,
      onSubmit,
      validationSchema: schema,
      enableReinitialize: true,
      layout: "vertical",
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(Content, { model, Elements, renderElement })
    }
  ) });
}
function useDynamicForm(model) {
  const initialState = useMemo(
    () => model.elements.reduce(
      (acc, c) => {
        acc[c.id] = c.defaultValue ?? null;
        return acc;
      },
      {}
    ),
    [model]
  );
  const result = useState(initialState);
  return result;
}
function DynamicFormTabContent(props) {
  const { model, Elements } = props;
  const [state, setState] = useDynamicForm(model);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Flex, { justify: "center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    DynamicForm,
    {
      Elements: DesignerUtil.flattenElements(Elements),
      model,
      initialValue: state,
      onSubmit: setState
    }
  ) });
}
const DesignerGroup = DynamicFormTheme.flexy("DesignerGroup", (props) => {
  const { locationHash: _, rootClassName, defaultTab = "designer", ...designerProps } = props;
  const { locationHash, Elements, model } = props;
  const [tab, setTab] = useState(
    window.location.hash.length > 0 ? window.location.hash.substring(1) : defaultTab
  );
  useEffect(() => {
    if (locationHash) window.location.hash = tab;
  }, [tab]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: classNames(clx("designer-group"), rootClassName), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
    Tabs,
    {
      activeKey: tab,
      onChange: setTab,
      items: [
        {
          key: "form",
          label: "Preview",
          children: tab === "form" && /* @__PURE__ */ jsxRuntimeExports.jsx(DynamicFormTabContent, { Elements, model })
        },
        { key: "designer", label: "Designer", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Designer, { ...designerProps }) }
      ]
    }
  ) });
});
const EMPTY_SUBMIT = () => {
};
function useDesignerState(props) {
  const { onChange: onChangeProp } = props;
  const [selected, setSelected] = useState(null);
  const [animate, setAnimate] = useState(false);
  const onChange = useCallback(
    (model) => {
      if (selected && !model.elements.some((el) => el.id === selected)) {
        setSelected(null);
      }
      onChangeProp(model);
    },
    [onChangeProp, selected]
  );
  useEffect(() => {
    setAnimate(true);
  }, []);
  return { ...props, onChange, selected, onSelect: setSelected, animate };
}
function ElementModelSection(props) {
  const { offsetTop } = props;
  const { model, selectedId } = useDesignerContext();
  const content = model.elements.find((el) => el.id === selectedId) && /* @__PURE__ */ jsxRuntimeExports.jsx(ElementModelDesigner, {});
  return offsetTop == null ? content : /* @__PURE__ */ jsxRuntimeExports.jsx(Affix, { offsetTop, children: content });
}
const DesignerComponent = DynamicFormTheme.flexy("Designer", (props) => {
  const { Elements, model, offsetTop, className, style: style2 } = props;
  const { onChange, selected, onSelect, animate } = useDesignerState(props);
  const initialValues = useMemo(() => ModelUtil.initialValue(model), [model]);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    DesignerContextProvider,
    {
      Elements,
      model,
      set: onChange,
      selectedId: selected,
      select: onSelect,
      children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: classNames(clx("designer"), className), style: style2, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Row, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Col, { flex: "none", className: clx("designer-menu-section"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ElementMenu, { offsetTop }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Col, { flex: "auto", className: clx("designer-main-section"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Formik,
          {
            uid: "designer-element-list",
            type: "formik",
            layout: "vertical",
            initialValues,
            onSubmit: EMPTY_SUBMIT,
            enableReinitialize: true,
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: clx("designer-element-list-section"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ElementList, { animate }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: clx("designer-state-section"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(DesignerState, {}) })
            ] })
          }
        ) }),
        selected && /* @__PURE__ */ jsxRuntimeExports.jsx(Col, { flex: "none", className: clx("designer-element-model-section"), children: /* @__PURE__ */ jsxRuntimeExports.jsx(ElementModelSection, { offsetTop }) })
      ] }) })
    }
  );
});
const Designer = Object.assign(DesignerComponent, {
  Group: DesignerGroup
});
const DEFAULT_MODEL = {
  elements: [
    {
      id: "title",
      element: "Heading",
      defaultValue: null,
      props: {
        marginBottom: "md",
        marginTop: "none",
        text: "Demographics",
        level: 3
      },
      validation: null
    },
    {
      id: "helpText",
      element: "Paragraph",
      defaultValue: null,
      props: {
        marginBottom: "lg",
        marginTop: "none",
        type: "secondary",
        text: 'We would need some demographics and contact information.\nPlease fill in information below, information with "*" mark is required.'
      },
      validation: null
    },
    {
      id: "gender",
      element: "RadioGroup",
      defaultValue: null,
      props: {
        condition: null,
        disabled: null,
        options: ["Male", "Female", "Other"],
        title: "Gender"
      },
      validation: [
        {
          type: "required"
        }
      ]
    },
    {
      id: "firstName",
      element: "Input",
      defaultValue: null,
      props: {
        disabled: null,
        placeholder: "James",
        htmlType: "text",
        type: "input",
        title: "First Name",
        multiline: false
      },
      validation: [
        {
          type: "required",
          message: null
        },
        {
          type: "test",
          message: "Might be at least 3 characters",
          test: {
            type: "BinaryExpression",
            operator: "<",
            left: {
              type: "CallExpression",
              function: "len",
              args: [
                {
                  type: "ReferenceExpression",
                  ref: "firstName"
                }
              ]
            },
            right: {
              type: "ConstantExpression",
              value: "3"
            }
          }
        },
        {
          type: "test",
          message: "Might be less than 10 characters",
          test: {
            type: "BinaryExpression",
            operator: ">",
            left: {
              type: "CallExpression",
              function: "len",
              args: [
                {
                  type: "ReferenceExpression",
                  ref: "firstName"
                }
              ]
            },
            right: {
              type: "ConstantExpression",
              value: "10"
            }
          }
        }
      ]
    },
    {
      id: "lastName",
      element: "Input",
      defaultValue: null,
      props: {
        disabled: null,
        placeholder: "Doe",
        htmlType: "text",
        type: "input",
        title: "Last Name",
        multiline: false
      },
      validation: [
        {
          type: "required",
          message: null
        },
        {
          type: "test",
          message: "Might be at least 3 characters",
          test: {
            type: "BinaryExpression",
            operator: "<",
            left: {
              type: "CallExpression",
              function: "len",
              args: [
                {
                  type: "ReferenceExpression",
                  ref: "lastName"
                }
              ]
            },
            right: {
              type: "ConstantExpression",
              value: "3"
            }
          }
        },
        {
          type: "test",
          message: "Might be less than 10 characters",
          test: {
            type: "BinaryExpression",
            operator: ">",
            left: {
              type: "CallExpression",
              function: "len",
              args: [
                {
                  type: "ReferenceExpression",
                  ref: "lastName"
                }
              ]
            },
            right: {
              type: "ConstantExpression",
              value: "10"
            }
          }
        }
      ]
    },
    {
      id: "maidenName",
      element: "Input",
      defaultValue: null,
      props: {
        disabled: null,
        htmlType: "text",
        type: "input",
        title: "Maiden Name"
      },
      validation: null,
      condition: {
        type: "BinaryExpression",
        operator: "=",
        left: {
          type: "ReferenceExpression",
          ref: "gender"
        },
        right: {
          type: "ConstantExpression",
          value: "Female"
        }
      }
    },
    {
      id: "divider1",
      element: "Divider",
      defaultValue: null,
      props: {
        marginBottom: "lg",
        marginTop: "lg"
      },
      validation: null
    },
    {
      id: "contactInformationTitle",
      element: "Heading",
      defaultValue: null,
      props: {
        marginBottom: "md",
        marginTop: "none",
        text: "Contact information",
        level: 4
      },
      validation: null
    },
    {
      id: "phoneNumber",
      element: "Input",
      defaultValue: null,
      props: {
        disabled: null,
        placeholder: "+1 25325 326 3262",
        htmlType: "text",
        type: "input",
        title: "Phone Number",
        multiline: false
      },
      validation: null
    },
    {
      id: "email",
      element: "Input",
      defaultValue: null,
      props: {
        disabled: null,
        placeholder: "james.doe@gmail.com",
        htmlType: "text",
        type: "input",
        title: "Email",
        multiline: false
      },
      validation: [
        {
          type: "required"
        }
      ]
    },
    {
      id: "divider2",
      element: "Divider",
      defaultValue: null,
      props: {
        marginBottom: "lg",
        marginTop: "lg"
      },
      validation: null
    },
    {
      id: "aboutYourselfTitle",
      element: "Heading",
      defaultValue: null,
      props: {
        marginBottom: "md",
        marginTop: "none",
        text: "About yourself",
        level: 4
      },
      validation: null
    },
    {
      id: "bio",
      element: "Input",
      defaultValue: null,
      props: {
        disabled: null,
        htmlType: "text",
        type: "textarea",
        title: "Bio"
      },
      validation: null
    },
    {
      id: "specialty",
      element: "Select",
      defaultValue: null,
      props: {
        disabled: null,
        options: ["Therapist", "Surgery", "Pediatrics", "Dentist", "Other"],
        title: "Specialty"
      },
      validation: [
        {
          type: "required",
          message: null
        }
      ]
    },
    {
      id: "submitBtn",
      element: "SubmitButton",
      defaultValue: null,
      props: {
        align: "right",
        text: "Submit",
        type: "primary"
      },
      validation: null
    }
  ]
};
const Switch = createElement({
  id: "Switch",
  props: Yup.object({
    textOn: Yup.string().required().default("ON").label("Text displayed when switch is ON"),
    textOff: Yup.string().required().default("OFF").label("Text displayed when switch is OFF")
  }),
  Component: ({ name, textOn, textOff }) => {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Form.Switch, { name, checkedChildren: textOn, unCheckedChildren: textOff });
  }
});
function App() {
  const [model, setModel] = useState(DEFAULT_MODEL);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Designer.Group,
    {
      model,
      onChange: setModel,
      Elements: [...ELEMENTS, Switch],
      locationHash: true,
      offsetTop: 0
    }
  );
}
clientExports.createRoot(document.getElementById("root")).render(
  /* @__PURE__ */ jsxRuntimeExports.jsx(StrictMode, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(App, {}) })
);
//# sourceMappingURL=index-DMJqbMLy.js.map
