module.exports = createHelloWorldService

function createHelloWorldService ({config, logger, statsd}) {
  return {
    sayHelloWorld () {
      logger.info('sayHelloWorld()')
      statsd.increment('service.helloWorld', ['operation:sayHelloWorld'])
      return `Hello World, I'm running on ${config.get('env')} environment !!!`
    }
  }
}
